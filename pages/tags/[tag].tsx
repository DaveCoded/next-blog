import Head from 'next/head'
import { GetStaticProps } from 'next'
import { getPostSlugsForTag, getAllTags } from '../../lib/tags'
import { getPostdata } from '../../lib/posts'
import matter from 'gray-matter'
import styles from './tag.module.css'
import { PostData } from '..'
import Link from 'next/link'

interface Props {
    tag: string
    frontMatterAndSlug: PostData[]
}

export default function Posts({ tag, frontMatterAndSlug }: Props) {
    const tagName = tag[0].toUpperCase() + tag.slice(1)

    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {tag} posts</title>
                <meta
                    name="description"
                    content={`A collection of all posts with the ${tag} tag`}
                ></meta>
            </Head>
            <div className={styles.PageContainer}>
                <h1 className={styles.TagHeading}>{tagName} posts</h1>
                {frontMatterAndSlug.map((post, i) => {
                    const options = { month: 'long', day: 'numeric', year: 'numeric' }
                    const formattedDate = new Date(post.date).toLocaleDateString(
                        'en-US',
                        options as any
                    )
                    return (
                        <div key={i} className={styles.Post}>
                            <Link href={`/blog/${post.slug}`}>
                                <a>
                                    <h3 className={styles.PostTitle}>{post.title}</h3>
                                </a>
                            </Link>
                            <div className={styles.Date}>{formattedDate}</div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export async function getStaticPaths() {
    const paths = getAllTags()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const tag = params?.tag
    const slugsWithTag = getPostSlugsForTag(params?.tag as string)
    const postsWithTag = await Promise.all(slugsWithTag.map((slug) => getPostdata(slug)))
    const frontMatterArr = postsWithTag.map((post) => matter(post).data)
    const frontMatterAndSlug = frontMatterArr.map((fm, i) => ({ ...fm, slug: slugsWithTag[i] }))

    return {
        props: {
            tag,
            frontMatterAndSlug
        }
    }
}
