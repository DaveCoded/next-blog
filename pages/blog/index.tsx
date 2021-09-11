import Head from 'next/head'
import styled from 'styled-components'
import SearchAndDisplayPosts from '../../components/search/SearchAndDisplayPosts'
import { getSortedPosts } from '../../lib/posts'
import { getAllTags } from '../../lib/tags'

export interface PostData {
    slug: string
    date: string
    title: string
    subtitle?: string
    excerpt?: string
    description?: string
    status?: 'published' | 'draft'
    tags?: string[]
}

interface Props {
    allPostsData: PostData[]
    tags: string[]
}

export default function Home({ allPostsData, tags }: Props) {
    return (
        <>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>

            <Container>
                <h1>Blog roll</h1>
                <SearchAndDisplayPosts tags={tags} allPostsData={allPostsData} />
            </Container>
        </>
    )
}

const Container = styled.div`
    max-width: 40rem;
`

export async function getStaticProps() {
    const allPostsData = getSortedPosts()
    const tags = getAllTags().map((obj) => obj.params.tag)
    const uniqueTags = Array.from(new Set(tags))

    return {
        props: {
            allPostsData,
            tags: uniqueTags
        }
    }
}
