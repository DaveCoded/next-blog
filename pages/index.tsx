import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { getSortedPosts } from '../lib/posts'
import LatestPosts from '../components/list/LatestPosts'
import ProjectsList from '../components/list/ProjectsList'
import { PostData } from '../types/PostData'

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
                        <BlogLink>blog</BlogLink>
                    </Link>
                    .
                </p>
            </Header>

            <Section>
                <div>
                    <H2>Latest posts</H2>
                    <LatestPosts posts={latestPosts} />
                    <Link href="/blog">
                        <AllPostsLink>See all posts &#8594;</AllPostsLink>
                    </Link>
                </div>
                <div>
                    <H2>Projects</H2>
                    <ProjectsList />
                </div>
            </Section>
        </>
    )
}

const Header = styled.header`
    max-width: 30rem;
    margin-bottom: var(--space-lg);
`

const BlogLink = styled.a`
    color: var(--purple);
    text-decoration: underline;
    &:hover {
        color: var(--teal);
    }
`

const Section = styled.section`
    max-width: 80rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem 5rem;
    margin-bottom: 5rem;

    @media (max-width: 930px) {
        grid-template-columns: 1fr;
    }
`

const H2 = styled.h2`
    font-size: var(--text-ml);
    margin-top: 0;
    margin-bottom: var(--space-lg);
`

const AllPostsLink = styled.a`
    color: var(--cool-grey);
`

export async function getStaticProps() {
    const latestPosts = getSortedPosts().slice(0, 3)

    return {
        props: {
            latestPosts
        }
    }
}
