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

            <PageContainer>
                <Search />
                <TagsContainer>
                    <SearchLabel>Search by tag:</SearchLabel>
                    <ul>
                        {tags.map((tag, i) => (
                            <Tag key={i}>
                                <Link href={`/tag/${tag}`}>
                                    <a>{tag}</a>
                                </Link>
                            </Tag>
                        ))}
                    </ul>
                </TagsContainer>
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
            </PageContainer>
        </>
    )
}

const PageContainer = styled.div`
    width: min(90%, 640px);
    margin: 0 auto;
`

const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 8px;
`

const SearchLabel = styled.span`
    font-size: 1.2rem;
    margin-right: 4px;
`

const Tag = styled.li`
    border: 2px solid var(--black);
    margin-left: 8px;
    list-style: none;
    display: inline;
    padding: 4px 8px;
    cursor: pointer;

    &:hover {
        background-color: hsl(0deg 0% 100% / 55%);
    }
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
    border: 2px solid var(--black);
    padding: 1rem 2rem;
`

const H2 = styled.h2`
    margin: 0;
    margin-bottom: 1rem;
`

const StyledDate = styled.span`
    font-size: 1.1rem;
    color: #383245;
    font-style: italic;
`

const Excerpt = styled.p`
    font-size: 1.4rem;
    margin-bottom: 0.4rem;
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
