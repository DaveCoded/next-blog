import Link from 'next/link'
import { getSortedPosts } from '../../lib/posts'

export interface PostData {
    slug: string
    date: string
    title: string
    excerpt: string
}

interface Props {
    allPostsData: PostData[]
}

const BlogIndex = ({ allPostsData }: Props) => {
    return (
        <div
            style={{
                height: '100vh',
                maxWidth: '760px',
                margin: '0 auto'
            }}
        >
            <h1>My Blog</h1>
            <div>
                {allPostsData.map(({ slug, date, title, excerpt }) => (
                    <ul key={slug}>
                        <li>
                            <div>
                                <Link
                                    key={slug}
                                    href="/blog/[slug]"
                                    as={`/blog/${slug}`}
                                >
                                    <a>
                                        <h2>{title}</h2>
                                    </a>
                                </Link>
                                <div>{excerpt}</div>
                                <span>{date}</span>
                            </div>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default BlogIndex

export async function getStaticProps() {
    const allPostsData = getSortedPosts()
    return {
        props: {
            allPostsData
        }
    }
}
