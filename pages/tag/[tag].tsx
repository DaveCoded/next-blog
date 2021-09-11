import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPostSlugsForTag, getAllTags } from '../../lib/tags'
import { getPostdata } from '../../lib/posts'
import matter from 'gray-matter'
import { PostData } from '../blog'
import Link from 'next/link'
import styled from 'styled-components'
import DynamicPostsList from '../../components/list/DynamicPostsList'

interface Props {
    tag: string
    frontMatterAndSlug: PostData[]
}

export default function Posts({ tag, frontMatterAndSlug }: Props) {
    const tagName = tag[0].toUpperCase() + tag.slice(1)

    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {tag} posts</title>
                <meta
                    name="description"
                    content={`A collection of all posts with the ${tag} tag`}
                ></meta>
            </Head>

            <H1>{tagName} posts</H1>

            <DynamicPostsList postsToShow={frontMatterAndSlug} />
        </>
    )
}

const H1 = styled.h1`
    text-transform: none;
    letter-spacing: normal;
`

const H3 = styled.h3`
    margin: 0;
    margin-bottom: 0.7rem;
    transition: all 0.15s ease-in;

    &:hover {
        color: #290168;
        text-shadow: 2px 2px #ffdbe2;
    }
`

const Post = styled.div`
    padding: 10px 20px;
    border: 2px solid var(--black);

    & + & {
        margin-top: 24px;
    }
`

const StyledDate = styled.div`
    font-size: 1.1rem;
    color: #383245;
    font-style: italic;
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
    const slugsWithTag = getPostSlugsForTag(params?.tag as string)
    const postsWithTag = await Promise.all(slugsWithTag.map((slug) => getPostdata(slug)))
    const frontMatterArr = postsWithTag.map((post) => matter(post).data)
    const frontMatterAndSlug = frontMatterArr.map((fm, i) => ({ ...fm, slug: slugsWithTag[i] }))

    return {
        props: {
            tag,
            frontMatterAndSlug
        }
    }
}
