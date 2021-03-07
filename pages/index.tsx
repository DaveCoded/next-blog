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
    description: string
}

interface Props {
    allPostsData: PostData[]
}

export default function Home({ allPostsData }: Props) {
    return (
        <main
            style={{
                height: '100vh',
                maxWidth: '640px',
                margin: '0 auto'
            }}
        >
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>
            <ul className={styles.PostsList}>
                {allPostsData.map(({ slug, date, title, excerpt }, i: number) => (
                    <li key={slug} className={styles.ListItem}>
                        <div className="BlogIndex__Post">
                            <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                                <a>
                                    <h2 className="BlogIndex__Heading">{title}</h2>
                                </a>
                            </Link>
                            <div className="BlogIndex__Exerpt">{excerpt}</div>
                            <span className="BlogIndex__Date">{date}</span>
                        </div>
                        {i !== allPostsData.length - 1 ? (
                            <hr className={styles.HorizontalRule} />
                        ) : null}
                    </li>
                ))}
            </ul>
        </main>
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
