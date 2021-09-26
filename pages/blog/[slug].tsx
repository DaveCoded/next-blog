import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { MdxRemote } from 'next-mdx-remote/types'
import styled from 'styled-components'
import { H2 } from '../../components/mdx/typography'
import TagPill from '../../components/TagPill'
import { PostData } from '../../types/PostData'
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
    const { title, description, subtitle, date, tags, keywords } = frontMatter
    const formattedDate = new Date(date).toLocaleDateString('en-US', options)

    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog | {title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keywords" content={keywords}></meta>
            </Head>

            <PostContainer>
                <Title hasSubtitle={!!subtitle}>{title}</Title>
                {subtitle && <Subtitle>{subtitle}</Subtitle>}

                <Metadata>
                    <StyledDate>{formattedDate}</StyledDate>
                    {tags && tags.length > 0 ? (
                        <TagContainer>
                            <ul>
                                {tags.map((tag) => (
                                    <TagPill
                                        tag={tag}
                                        key={tag}
                                        color="var(--white)"
                                        backgroundColor="var(--cool-grey)"
                                        hoverBackgroundColor="var(--mid-grey)"
                                    />
                                ))}
                            </ul>
                        </TagContainer>
                    ) : null}
                </Metadata>

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

const Title = styled.h1<{ hasSubtitle: boolean }>`
    color: var(--light-black);
    margin-top: var(--space-lg);
    margin-bottom: ${(props) => (props.hasSubtitle ? 'var(--space-md)' : 'var(--space-lg)')};
    max-width: min(100%, 800px);
    line-height: 1.1;

    @media (max-width: 500px) {
        font-size: var(--text-lg);
        margin-bottom: var(--space-sm);
    }
`

const Subtitle = styled(H2)`
    color: var(--light-black);
    font-family: 'Averta', sans-serif;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: var(--space-md);
    font-size: var(--text-md);
    max-width: min(100%, 1000px);
`

const Metadata = styled.div`
    display: flex;
    align-items: baseline;
    font-weight: 600;
    font-size: var(--text-sm);
`

const StyledDate = styled.div`
    color: var(--dark-grey);
    margin-bottom: var(--space-xs);
`

const TagContainer = styled.div`
    ul {
        display: flex;
        margin-left: var(--space-md);
        gap: var(--space-sm);
    }
`

const ContentWrapper = styled.div`
    margin-top: var(--space-xxl);
    max-width: 650px;
`
