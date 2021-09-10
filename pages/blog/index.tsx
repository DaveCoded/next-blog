import Head from 'next/head'
import Link from 'next/link'
import styled from 'styled-components'
import Search from '../../components/search/Search'
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

                <Search tags={tags} />

                <PostsList>
                    {allPostsData.map(({ slug, date, title, excerpt, status }, i) => (
                        <li key={i}>
                            <Post>
                                <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                                    <a>
                                        <H2>
                                            {title}
                                            {status === 'draft' ? <Draft> Draft</Draft> : null}
                                        </H2>
                                    </a>
                                </Link>
                                <Excerpt>{excerpt}</Excerpt>
                                <StyledDate>{date}</StyledDate>
                            </Post>
                        </li>
                    ))}
                </PostsList>
            </Container>
        </>
    )
}

const Container = styled.div`
    max-width: 40rem;
`

const PostsList = styled.ul`
    margin: 0;
    padding: 4rem 0 5rem;

    li {
        list-style: none;
    }
`

const Post = styled.div`
    margin-bottom: 3.5rem;
`

const H2 = styled.h2`
    margin: 0;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const StyledDate = styled.span`
    font-size: 1.1rem;
    font-weight: 300;
    color: var(--cool-grey);
`

const Excerpt = styled.p`
    font-size: 1.3rem;
    margin: 0.2rem 0 0.4rem;
    color: var(--light-grey);
`

const Draft = styled.span`
    color: white;
    font-family: 'Poppins';
    font-size: 1.1rem;
    font-weight: 800;
    vertical-align: super;
    margin-left: 0.6rem;
    padding-right: 0.3rem;
    border: 2px solid red;
    border-radius: 4px;
    background: red;
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
