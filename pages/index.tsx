import Head from 'next/head'
import Link from 'next/link'
import Search from '../components/Search/Search'
import { getSortedPosts } from '../lib/posts'
import classes from './index.module.css'
import styles from './index.module.css'

export interface PostData {
    slug: string
    date: string
    title: string
    subtitle: string
    excerpt: string
    description: string
    status: 'published' | 'draft'
}

interface Props {
    allPostsData: PostData[]
}

export default function Home({ allPostsData }: Props) {
    return (
        <div className={classes.BlogIndexMain}>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>
            <Search />
            <ul className={styles.PostsList}>
                {allPostsData.map(({ slug, date, title, excerpt, status }) => (
                    <li key={slug} className={styles.ListItem}>
                        <div className={styles.Post}>
                            <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                                <a>
                                    <h2 className={styles.Heading}>
                                        {title}
                                        {status === 'draft' ? (
                                            <span className={styles.Draft}> Draft</span>
                                        ) : null}
                                    </h2>
                                </a>
                            </Link>
                            <div className={styles.Excerpt}>{excerpt}</div>
                            <span className={styles.Date}>{date}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
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
