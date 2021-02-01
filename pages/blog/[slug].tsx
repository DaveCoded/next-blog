import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { PostData } from '.'

interface Props {
    source: any
    frontMatter: PostData
}

const components = AllComponents

export default function Posts({ source, frontMatter }: Props) {
    const content = hydrate(source, { components })
    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
            </Head>
            <div style={{ maxWidth: '840px', margin: '0 auto' }}>
                <div>
                    <h1>{frontMatter.title}</h1>
                    <div>
                        <span>{frontMatter.date}</span>
                    </div>
                </div>
                <div>
                    <div>{content}</div>
                </div>
            </div>
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
    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            remarkPlugins: [require('remark-code-titles')],
            rehypePlugins: [mdxPrism]
        },
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            frontMatter: data
        }
    }
}
