import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import styled from 'styled-components'
import mdxPrism from 'mdx-prism'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { linkify } from '../../lib/linkify'

import AllComponents from '../../components/mdx/AllComponents'
import PostMetadata from '../../components/PostMetadata'
import { H2 } from '../../components/mdx/typography'
import PageLayout from '../../components/Layout/PageLayout'
import Backlinks from '../../components/Backlinks'

import { LinkReference } from '../../scripts/post-links'
import { PostData } from '../../types/PostData'
import PostLinks from '../../links.json'

interface Props {
    source: MDXRemoteSerializeResult<Record<string, unknown>>
    frontMatter: PostData
    backlinks: LinkReference[]
}

const components = AllComponents

export default function Posts({ source, frontMatter, backlinks }: Props) {
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
                    <PostMetadata
                        completion={completion}
                        date={date}
                        updated={updated}
                        tags={tags}
                    />

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

const ContentWrapper = styled.div`
    counter-reset: sidenote-counter;
    margin-top: var(--space-xxl);
    max-width: 650px;
`
