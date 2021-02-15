import Link from 'next/link'
import { getSortedPosts } from '../../lib/posts'

import styles from './BlogIndex.module.css'

export interface PostData {
    slug: string
    date: string
    title: string
    subtitle: string
    excerpt: string
}

interface Props {
    allPostsData: PostData[]
}

const BlogIndex = ({ allPostsData }: Props) => {
    const latestPost = allPostsData[0]
    const allOtherPsts = allPostsData.slice(1)

    return (
        <div
            style={{
                height: '100vh',
                maxWidth: '760px',
                margin: '0 auto'
            }}
        >
            <div>
                <article>
                    <Link href="/blog/[slug]" as={`/blog/${latestPost.slug}`}>
                        <a>
                            <h2>{latestPost.title}</h2>
                        </a>
                    </Link>
                    <div>{latestPost.excerpt}</div>
                    <span>{latestPost.date}</span>
                </article>
                <ul className={styles.PostsList}>
                    {allOtherPsts.map(({ slug, date, title, excerpt }) => (
                        <li key={slug} className={styles.ListItem}>
                            <div>
                                <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                                    <a>
                                        <h2>{title}</h2>
                                    </a>
                                </Link>
                                <div>{excerpt}</div>
                                <span>{date}</span>
                            </div>
                        </li>
                    ))}
                </ul>
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
