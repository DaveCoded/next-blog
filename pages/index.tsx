import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import { getSortedPosts } from '../lib/posts'
import LatestPosts from '../components/list/LatestPosts'
import ProjectsList from '../components/list/ProjectsList'
import RollingText from '../components/RollingText'
import { PostData } from '../types/PostData'
import ExternalLink from '../components/ExternalLink'

interface Props {
    latestPosts: PostData[]
}

export default function Home({ latestPosts }: Props) {
    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>

            <Header>
                <h1>
                    This is a{' '}
                    <RollingText options={['blog', 'portfolio', 'playground', 'website']} />
                </h1>
                <p>
                    I&apos;m Dave, a frontend developer at{' '}
                    <ExternalLink
                        href="https://www.feed.xyz/"
                        newTab
                        style={{ textDecoration: 'underline', color: 'var(--link-pink)' }}
                    >
                        Feed
                    </ExternalLink>
                    . I work on a global, cross-channel marketing solution for ebay. I also write
                    about what I learn on my blog.
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
        </>
    )
}

const Header = styled.header`
    max-width: 70rem;
    margin-bottom: var(--space-xxxl);

    h1 {
        font-size: var(--text-xxl);
        font-weight: 600;
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
    font-weight: 600;
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
