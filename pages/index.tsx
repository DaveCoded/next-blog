import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { getSortedPosts, PostFileContents } from '../lib/posts'
import LatestPosts from '../components/list/LatestPosts'
import ProjectsList from '../components/list/ProjectsList'
import ExternalLink from '../components/ExternalLink'
import PageLayout from '../components/Layout/PageLayout'

interface Props {
    latestPosts: PostFileContents[]
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
            <PageLayout>
                <Header>
                    <h1>This is a website</h1>
                    <p>
                        I'm Dave, a frontend developer working on the Enterprise team at{' '}
                        <ExternalLink
                            href="https://tray.io/"
                            newTab
                            style={{ textDecoration: 'underline', color: 'var(--link-pink)' }}
                        >
                            tray.io
                        </ExternalLink>
                        . I code, read and write about what I learn on my blog.
                    </p>
                </Header>

                <Section>
                    <div>
                        <H2>Latest posts</H2>
                        <LatestPosts posts={latestPosts} />
                        <Link href="/blog" passHref>
                            <AllPostsLink>See all posts &#8594;</AllPostsLink>
                        </Link>
                    </div>
                    <div>
                        <H2>Projects</H2>
                        <ProjectsList />
                    </div>
                </Section>
            </PageLayout>
        </>
    )
}

const Header = styled.header`
    max-width: 70rem;
    margin-bottom: var(--space-xxxl);

    h1 {
        font-size: var(--text-xxl);
        margin-bottom: var(--space-md);
    }

    p {
        max-width: 30rem;
    }
`

const Section = styled.section`
    max-width: 80rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 3rem 5rem;

    @media (max-width: 930px) {
        grid-template-columns: 1fr;
    }
`

const H2 = styled.h2`
    font-size: var(--text-lg);
    margin-top: 0;
    margin-bottom: var(--space-lg);
    color: var(--light-grey);
`

const AllPostsLink = styled.a`
    color: var(--cool-grey);
    font-size: var(--text-sm);
`

export async function getStaticProps() {
    const latestPosts = getSortedPosts().slice(0, 3)

    return {
        props: {
            latestPosts
        }
    }
}
