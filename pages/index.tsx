import Head from 'next/head'
import Link from 'next/link'
import { getSortedPosts } from '../lib/posts'
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

export default function Home({ allPostsData }: Props) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main
                style={{
                    height: '100vh',
                    maxWidth: '640px',
                    margin: '0 auto'
                }}
            >
                <ul className={styles.PostsList}>
                    {allPostsData.map(({ slug, date, title, excerpt }, i) => (
                        <>
                            <li key={slug} className={styles.ListItem}>
                                <div className="BlogIndex__Post">
                                    <Link key={slug} href="/blog/[slug]" as={`/blog/${slug}`}>
                                        <a>
                                            <h2 className="BlogIndex__Heading">{title}</h2>
                                        </a>
                                    </Link>
                                    <div className="BlogIndex__Exerpt">{excerpt}</div>
                                    <span className="BlogIndex__Date">{date}</span>
                                </div>
                            </li>
                            {i !== allPostsData.length - 1 ? (
                                <hr className={styles.HorizontalRule} />
                            ) : null}
                        </>
                    ))}
                </ul>
            </main>
        </>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPosts()
    return {
        props: {
            allPostsData
        }
    }
}
