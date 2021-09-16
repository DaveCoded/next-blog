import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPostSlugsForTag, getAllTags, getUniqueTags } from '../../lib/tags'
import { getPostdata } from '../../lib/posts'
import matter from 'gray-matter'
import styled from 'styled-components'
import DynamicPostsList from '../../components/list/DynamicPostsList'
import TagPill from '../../components/TagPill'
import { PostData } from '../../types/PostData'

interface Props {
    tag: string
    tags: string[]
    frontMatterAndSlug: PostData[]
}

export default function TagPage({ tag, tags, frontMatterAndSlug }: Props) {
    const tagName = tag[0].toUpperCase() + tag.slice(1)

    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog | {tag} posts</title>
                <meta
                    name="description"
                    content={`A collection of all posts with the ${tag} tag`}
                ></meta>
            </Head>

            <Header>
                Other topics:{' '}
                <UL>
                    {tags.map((tag) => (
                        <TagPill tag={tag} key={tag} />
                    ))}
                </UL>
            </Header>

            <H1>{tagName} posts</H1>

            <DynamicPostsList postsToShow={frontMatterAndSlug} />
        </>
    )
}

const Header = styled.header`
    margin-bottom: var(--space-lg);
`

const H1 = styled.h1`
    text-transform: none;
    letter-spacing: normal;
`

const UL = styled.ul`
    display: inline-flex;
    margin-left: var(--space-xs);

    a + a {
        margin-left: var(--space-sm);
    }
`

export async function getStaticPaths() {
    const paths = getAllTags()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const tag = params?.tag
    const tags = getUniqueTags().filter((t) => t !== tag) // Get all OTHER unique tags
    const slugsWithTag = getPostSlugsForTag(params?.tag as string)
    const postsWithTag = await Promise.all(slugsWithTag.map((slug) => getPostdata(slug)))
    const frontMatterArr = postsWithTag.map((post) => matter(post).data)
    const frontMatterAndSlug = frontMatterArr.map((fm, i) => ({ ...fm, slug: slugsWithTag[i] }))

    return {
        props: {
            tag,
            tags,
            frontMatterAndSlug
        }
    }
}
