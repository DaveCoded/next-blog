import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { PostData } from '.'
import { MdxRemote } from 'next-mdx-remote/types'
import styled from 'styled-components'
import { H2 } from '../../components/mdx/typography'
import TagPill from '../../components/TagPill'
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

            <PostContainer>
                <Title>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}
                <StyledDate>{formattedDate}</StyledDate>
                {tags && tags.length > 0 ? (
                    <TagContainer>
                        <ul>
                            {tags.map((tag) => (
                                <TagPill
                                    tag={tag}
                                    key={tag}
                                    color="var(--white)"
                                    backgroundColor="var(--purple)"
                                    hoverBackgroundColor="var(--purple-blue)"
                                />
                            ))}
                        </ul>
                    </TagContainer>
                ) : null}
                {/* <div className={styles.Categories}>Some category tags here maybe?</div> */}
                {/* <TableOfContents headings={headings} /> */}
                <ContentWrapper>{content}</ContentWrapper>
            </PostContainer>
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

const PostContainer = styled.div`
    color: var(--black);
`

const Title = styled.h1`
    margin-bottom: 0;
    margin-top: -17px;
    max-width: min(100%, 1000px);
`

const Subtitle = styled(H2)`
    font-weight: 400;
    margin-top: 0;
    margin-bottom: var(--space-lg);
    font-size: var(--text-md);
    max-width: min(100%, 1000px);
`

const StyledDate = styled.div`
    font-size: var(--text-sm);
    color: var(--dark-grey);
    margin-bottom: var(--space-xs);
`

const TagContainer = styled.div`
    margin-bottom: -15px;

    ul {
        display: flex;

        a + a {
            margin-left: 1rem;
        }
    }
`

const ContentWrapper = styled.div`
    margin-top: var(--space-xxl);
    max-width: 600px;
`
