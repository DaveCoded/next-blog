import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { PostData } from '.'
import { MdxRemote } from 'next-mdx-remote/types'
import Link from 'next/link'
import styled from 'styled-components'
// import TableOfContents from '../../components/TableOfContents'

interface Props {
    source: MdxRemote.Source
    frontMatter: PostData
    headings?: { text: string; level: number }[]
}

const components = AllComponents

export default function Posts({ source, frontMatter }: Props) {
    const content = hydrate(source, { components })
    const options = { month: 'long', day: 'numeric', year: 'numeric' } as any
    const { title, description, subtitle, date, tags } = frontMatter
    const formattedDate = new Date(date).toLocaleDateString('en-US', options)

    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {title}</title>
                <meta name="description" content={description}></meta>
            </Head>

            <PostContainer>
                <h1>{title}</h1>
                {subtitle && <h2>{subtitle}</h2>}
                <div>{formattedDate}</div>
                {tags && tags.length > 0 ? (
                    <>
                        <hr />
                        <ul>
                            {tags.map((tag, i) => (
                                <Link key={i} href={`/tag/${tag}`}>
                                    <a>
                                        <li>{tag}</li>
                                    </a>
                                </Link>
                            ))}
                        </ul>
                    </>
                ) : null}
                {/* <div className={styles.Categories}>Some category tags here maybe?</div> */}
                {/* <TableOfContents headings={headings} /> */}
                {content}
            </PostContainer>
        </>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostSlugs()
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postContent = await getPostdata(params?.slug as string)
    const { data, content } = matter(postContent)
    // todo: figure out if getting the headings is a good idea or not
    // const headings = await getHeadings(content)
    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            rehypePlugins: [mdxPrism, require('rehype-slug'), require('rehype-autolink-headings')]
        },
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            frontMatter: data
            // headings
        }
    }
}

const PostContainer = styled.div``
