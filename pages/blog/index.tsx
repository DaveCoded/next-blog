import Link from 'next/link'
import { getSortedPosts } from '../../lib/posts'
import styles from './BlogIndex.module.css'
import Image from 'next/image'

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
                maxWidth: '840px',
                margin: '0 auto'
            }}
        >
            <article className={styles.LatestPost}>
                <div className={styles.LatestPost__CopyContainer}>
                    <Link href="/blog/[slug]" as={`/blog/${latestPost.slug}`}>
                        <a>
                            <h2 className={styles.LatestPost__Title}>{latestPost.title}</h2>
                        </a>
                    </Link>
                    <div className="center-space-between">
                        <span className={styles.LatestPost__Date}>{latestPost.date}</span>
                        <div>
                            <span className={styles.TagPill}>React</span>
                            <span className={styles.TagPill}>Next.js</span>
                        </div>
                    </div>
                    <div className={styles.LatestPost__Excerpt}>{latestPost.excerpt}</div>
                </div>
                <Image
                    src="/react.png"
                    alt="React logo"
                    width="300"
                    height="200"
                    className={styles.LatestPost__Image}
                />
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
