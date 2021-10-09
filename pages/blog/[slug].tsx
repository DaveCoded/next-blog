import Head from 'next/head'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import styled from 'styled-components'
import { H2 } from '../../components/mdx/typography'
import { PostData } from '../../types/PostData'
import PageLayout from '../../components/Layout/PageLayout'
import FireLevel from '../../components/FireLevel'
import { timeAgo } from '../../lib/dates'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { linkify } from '../../lib/linkify'
import PostLinks from '../../links.json'
import Backlinks from '../../components/Backlinks'
import { LinkReference } from '../../scripts/post-links'

interface Props {
    source: MDXRemoteSerializeResult<Record<string, unknown>>
    frontMatter: PostData
    backlinks: LinkReference[]
}

const components = AllComponents

export default function Posts({ source, frontMatter, backlinks }: Props) {
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
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            Tags:
                            {tags && tags.length > 0 ? (
                                <TagList>
                                    {tags.map((tag) => (
                                        <Link key={tag} href={`/tag/${tag}`}>
                                            <a>
                                                <Tag>{tag}</Tag>
                                            </a>
                                        </Link>
                                    ))}
                                </TagList>
                            ) : null}
                        </div>
                        <InnerMetadata>
                            <FireWrapper>
                                <FireLevel completion={completion} />
                            </FireWrapper>
                            <Pipe>|</Pipe>
                            <DateWrapper>
                                <FirstLit>First lit on {formattedLitDate}</FirstLit>
                                {updated && <span>Last stoked {lastStoked}</span>}
                            </DateWrapper>
                        </InnerMetadata>
                    </Metadata>

                    <ContentWrapper>
                        <MDXRemote {...source} components={components} />
                    </ContentWrapper>
                    <Backlinks backlinks={backlinks} />
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
    const contentWithBidirectionalLinks = linkify(content, data.title)

    const mdxSource = await serialize(contentWithBidirectionalLinks, {
        mdxOptions: {
            rehypePlugins: [mdxPrism, require('rehype-slug'), require('rehype-autolink-headings')]
        },
        scope: data
    })
    const backlinks = PostLinks.find((post) => post.ids[0] === data.title)?.inboundLinks || []

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            backlinks
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

    @media (max-width: 900px) {
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

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const InnerMetadata = styled.div`
    margin-left: auto;
    display: flex;
    align-items: baseline;

    @media (max-width: 900px) {
        flex-direction: column;
        margin-left: 0;
    }
`

const Tag = styled.li`
    font-style: italic;
    font-size: var(--text-sm);
    font-weight: 600;
    list-style: none;
    color: var(--light-black);
    text-decoration: underline;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--link-pink);
    }
`

const FireWrapper = styled.span`
    margin-left: auto;

    @media (max-width: 900px) {
        margin-left: 0;
    }
`

const Pipe = styled.span`
    margin: 0 var(--space-xs);

    @media (max-width: 900px) {
        display: none;
    }
`

const DateWrapper = styled.span`
    display: flex;
    flex-direction: column;
    text-align: right;
`

const FirstLit = styled.span`
    margin-bottom: var(--space-xxs);
`

const TagList = styled.ul`
    margin-left: var(--space-sm);
    display: flex;
    gap: var(--space-sm);
`

const ContentWrapper = styled.div`
    counter-reset: sidenote-counter;
    margin-top: var(--space-xxl);
    max-width: 650px;
`
