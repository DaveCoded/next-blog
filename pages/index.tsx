import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { getSortedPosts } from '../lib/posts'
import LatestPosts from '../components/list/LatestPosts'

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
    latestPosts: PostData[]
}

export default function Home({ latestPosts }: Props) {
    return (
        <>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>

            <Header>
                <h1>Welcome</h1>
                <p>
                    I'm Dave, a frontend developer at Feed. I work on a global, cross-channel
                    marketing solution for ebay. I also write about what I learn in my{' '}
                    <Link href="/blog">
                        <a>digital garden</a>
                    </Link>
                    .
                </p>
            </Header>

            <Section>
                <div>
                    <h2>Writings</h2>
                    {/* todo: LatestPosts component to display list */}
                    <LatestPosts posts={latestPosts} />
                </div>
                <div>
                    <h2>Projects</h2>
                </div>
            </Section>
        </>
    )
}

const Header = styled.header`
    max-width: 30rem;

    h1 {
        font-size: 2.2rem;
    }

    p {
        font-size: 1.1rem;
    }
`

const Section = styled.section`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

export async function getStaticProps() {
    const latestPosts = getSortedPosts().slice(0, 3)

    return {
        props: {
            latestPosts
        }
    }
}
