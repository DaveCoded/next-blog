import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { PostData } from '../'
import { MdxRemote } from 'next-mdx-remote/types'
import Link from 'next/link'
import styled from 'styled-components'
// import TableOfContents from '../../components/TableOfContents'

interface Props {
    source: MdxRemote.Source
    frontMatter: PostData
    headings?: { text: string; level: number }[]
}

const components = AllComponents

export default function Posts({ source, frontMatter }: Props) {
    const content = hydrate(source, { components })
    const options = { month: 'long', day: 'numeric', year: 'numeric' } as any
    const { title, description, subtitle, date, tags } = frontMatter
    const formattedDate = new Date(date).toLocaleDateString('en-US', options)

    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {title}</title>
                <meta name="description" content={description}></meta>
            </Head>

            <PageContainer>
                <TitleContainer>
                    <H1>{title}</H1>
                    {subtitle && <H2>{subtitle}</H2>}
                    <div>
                        <StyledDate>{formattedDate}</StyledDate>
                    </div>
                    {tags && tags.length > 0 ? (
                        <>
                            <HR />
                            <UL>
                                {tags.map((tag, i) => (
                                    <Link key={i} href={`/tags/${tag}`}>
                                        <A>
                                            <LI>{tag}</LI>
                                        </A>
                                    </Link>
                                ))}
                            </UL>
                        </>
                    ) : null}
                    {/* <div className={styles.Categories}>Some category tags here maybe?</div> */}
                </TitleContainer>
                {/* <TableOfContents headings={headings} /> */}
                {content}
            </PageContainer>
        </>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postContent = await getPostdata(params?.slug as string)
    const { data, content } = matter(postContent)
    // todo: figure out if getting the headings is a good idea or not
    // const headings = await getHeadings(content)
    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            rehypePlugins: [mdxPrism, require('rehype-slug'), require('rehype-autolink-headings')]
        },
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            frontMatter: data
            // headings
        }
    }
}

const PageContainer = styled.div`
    width: min(90%, 1100px);
    background: #fbf6f6;
    box-shadow: 0 0 10px 3px rgb(225 163 173);
    border-radius: 7px;
    margin: 3rem auto 10rem;
    padding: 0 2.5rem;
    padding-bottom: 3rem;
    display: grid;
    grid-template-columns: 1fr min(72ch, 100%) 1fr;

    & > * {
        grid-column: 2 / auto;
    }

    @media (max-width: 670px) {
        width: 100%;
        border-radius: 0;
    }
`

const TitleContainer = styled.div`
    text-align: center;
    grid-column: 1/4;
    width: min(100%, 900px);
    margin: 0 auto 4rem;
`

const H1 = styled.h1`
    margin: 5rem 0 1rem;
    padding: 0 2rem;
`

const H2 = styled.h2`
    font-family: 'century', serif;
    font-size: 1.7rem;
    font-weight: 400;
    font-style: italic;
    line-height: 1.4;
    margin: 0 auto 0rem;
    text-transform: none;
`

const StyledDate = styled.span`
    color: var(--black);
    font-family: 'Oswald';
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: 0.8px;
    margin-bottom: 2rem;
`

const HR = styled.hr`
    border: 1px solid var(--black);
    width: min(100%, 500px);
    margin: 36px auto;
`

const UL = styled.ul`
    margin-top: 16px;
    padding: 0;
`

const A = styled.a`
    color: var(--black);

    & + & {
        margin-left: 8px;
    }
`

const LI = styled.li`
    border: 2px solid var(--black);
    padding: 2px 8px;
    list-style: none;
    display: inline;

    &:hover {
        background-color: hsl(350, 49%, 81%);
    }
`
