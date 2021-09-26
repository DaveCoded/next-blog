import Head from 'next/head'
import styled from 'styled-components'
import SearchAndDisplayPosts from '../../components/algoliaSearch/SearchAndDisplayPosts'
import PageLayout from '../../components/Layout/PageLayout'
import { getSortedPosts } from '../../lib/posts'
import { getAllTags } from '../../lib/tags'
import { PostData } from '../../types/PostData'

interface Props {
    allPostsData: PostData[]
    tags: string[]
}

export default function Home({ allPostsData, tags }: Props) {
    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's blog index page. See a full list of writings he's written."
                ></meta>
            </Head>

            <PageLayout>
                <Container>
                    <h1>Blog roll</h1>
                    <SearchAndDisplayPosts tags={tags} allPostsData={allPostsData} />
                </Container>
            </PageLayout>
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
