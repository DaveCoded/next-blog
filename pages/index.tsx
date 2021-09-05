import Head from 'next/head'
import Link from 'next/link'
import Search from '../components/Search/Search'
import { getSortedPosts } from '../lib/posts'
import { getAllTags } from '../lib/tags'
import classes from './index.module.css'
import styles from './index.module.css'

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
        <div className={classes.BlogIndexMain}>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="Dave Bernhard's web development blog. Dave is a frontend developer in London; come check out his writing and projects."
                ></meta>
            </Head>
            <Search />
            <div className={styles.TagsContainer}>
                <span style={{ fontSize: '1.2rem', marginRight: 4 }}>Search by tag:</span>
                <ul className={styles.TagsList}>
                    {tags.map((tag) => (
                        <li key={tag} className={styles.Tag}>
                            <Link href={`/tags/${tag}`}>
                                <a>{tag}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
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
    const tags = getAllTags().map((obj) => obj.params.tag)
    const uniqueTags = Array.from(new Set(tags))

    return {
        props: {
            allPostsData,
            tags: uniqueTags
        }
    }
}
