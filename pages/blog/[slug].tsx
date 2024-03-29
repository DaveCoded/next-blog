import Head from 'next/head'
import { GetStaticPaths, GetStaticProps } from 'next'
import matter from 'gray-matter'
import styled from 'styled-components'
import mdxPrism from 'mdx-prism'
import remarkWikiLink from 'remark-wiki-link'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'

import { FrontMatter, getAllPostSlugs, getPostdata } from '@/lib/posts'
import { LinkReference } from '@/scripts/post-links'
import PostLinks from '../../links.json'
import { getHeadings } from '@/lib/getHeadings'

import CustomComponents from '@/components/mdx/CustomComponents'
import ReplacementComponents from '@/components/mdx/ReplacementComponents'

import PostMetadata from '@/components/PostMetadata'
import PageLayout from '@/components/Layout/PageLayout'
import Backlinks from '@/components/Backlinks'
import TableOfContents from '@/components/TableOfContents'
import getReadingTime from 'reading-time'

type Heading = {
    text: string
    level: number
}

interface Props {
    source: MDXRemoteSerializeResult<Record<string, unknown>>
    frontMatter: FrontMatter
    headings: Heading[]
    readingTime: string
    backlinks: LinkReference[]
}

const components = {
    ...CustomComponents,
    ...ReplacementComponents
}

export default function Posts({ source, frontMatter, headings, readingTime, backlinks }: Props) {
    const {
        title,
        description,
        subtitle,
        date,
        tags,
        keywords,
        completion = 'spark',
        updated,
        hideTOC,
        codeSnippet
    } = frontMatter

    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {title}</title>
                <meta name="description" content={description}></meta>
                <meta name="keywords" content={keywords}></meta>
            </Head>

            <PageLayout>
                <PostContainer>
                    {codeSnippet && <SnippetTag>Snippet</SnippetTag>}
                    <Title hasSubtitle={!!subtitle}>{title}</Title>
                    {subtitle && <Subtitle>{subtitle}</Subtitle>}
                    <HR />
                    <PostMetadata
                        completion={completion}
                        date={date}
                        readingTime={readingTime}
                        updated={updated}
                        tags={tags}
                    />

                    {headings.length > 0 && !hideTOC ? (
                        <TableOfContents headings={headings} />
                    ) : null}
                    <ContentWrapper>
                        <MDXRemote {...source} components={components} />
                    </ContentWrapper>

                    {backlinks.length > 0 && <Backlinks backlinks={backlinks} />}
                </PostContainer>
            </PageLayout>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postContent = getPostdata(params?.slug as string)
    const { data, content } = matter(postContent)
    const headings = getHeadings(content)
    const readingTime = getReadingTime(postContent).text

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [
                [
                    remarkWikiLink,
                    {
                        wikiLinkClassName: 'post-backlink',
                        // Ensures the title can be parsed from the href in ReplacementComponents.tsx
                        pageResolver: (name: string) => [name.trim()],
                        aliasDivider: '§'
                    }
                ]
            ],
            rehypePlugins: [mdxPrism, require('rehype-slug')]
        },
        scope: data
    })

    const backlinks = PostLinks.find((post) => post.ids[0] === data.title)?.inboundLinks || []

    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            headings,
            readingTime,
            backlinks
        }
    }
}

const PostContainer = styled.div`
    color: var(--black);
    max-width: min(100%, 800px);
`

const SnippetTag = styled.p`
    font-size: var(--text-sm);
    font-weight: 700;
    line-height: 1;
    width: min-content;
    margin-bottom: -1.5rem;
    padding: var(--space-xs) var(--space-sm);
    background: var(--purple-blue);
    color: white;
    border-radius: 4px;
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

const Subtitle = styled.h2`
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

    & > * {
        max-width: var(--post-content-max-width);
    }
`
