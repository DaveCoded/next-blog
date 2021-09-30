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
import PageLayout from '../../components/Layout/PageLayout'
import FireLevel from '../../components/FireLevel'
import { timeAgo } from '../../lib/dates'
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
    const {
        title,
        description,
        subtitle,
        date,
        tags,
        keywords,
        completion = 'spark',
        updated
    } = frontMatter
    const firstLitDate = new Date(date)
    const formattedLitDate = firstLitDate.toLocaleDateString('en-US', options)
    const lastStoked = (updated && timeAgo(new Date(updated))) || null

    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog | {title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keywords" content={keywords}></meta>
            </Head>

            <PageLayout>
                <PostContainer>
                    <Title hasSubtitle={!!subtitle}>{title}</Title>
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}

                    <HR />

                    <Metadata>
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
                        <FireWrapper>
                            <FireLevel completion={completion} />
                        </FireWrapper>
                        <DateWrapper>
                            <FirstLit>First lit on {formattedLitDate}</FirstLit>
                            {updated && <span>Last stoked {lastStoked}</span>}
                        </DateWrapper>
                    </Metadata>

                    {/* <TableOfContents headings={headings} /> */}
                    <ContentWrapper>{content}</ContentWrapper>
                </PostContainer>
            </PageLayout>
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
    max-width: min(100%, 800px);
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
    margin-bottom: var(--space-lg);
    font-size: var(--text-md);
    max-width: min(100%, 1000px);
`

const HR = styled.hr`
    border: 1px solid var(--cool-grey);
`

const Metadata = styled.div`
    display: flex;
    align-items: baseline;
    margin-top: var(--space-md);
    font-weight: 600;
    font-size: var(--text-sm);
`

const FireWrapper = styled.span`
    margin-left: var(--space-md);
`

const DateWrapper = styled.span`
    margin-left: auto;
    display: flex;
    flex-direction: column;
    text-align: right;
`

const FirstLit = styled.span`
    margin-bottom: var(--space-xxs);
`

const TagContainer = styled.div`
    ul {
        display: flex;
        gap: var(--space-sm);
    }
`

const ContentWrapper = styled.div`
    counter-reset: sidenote-counter;
    margin-top: var(--space-xxl);
    max-width: 650px;
`
