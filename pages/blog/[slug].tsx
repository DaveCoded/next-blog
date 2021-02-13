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
    const options = { month: 'long', day: 'numeric', year: 'numeric' }
    const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', options)
    return (
        <>
            <Head>
                <title>{frontMatter.title}</title>
            </Head>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1
                        style={{
                            fontFamily: 'Freight Sans',
                            fontSize: '4.5rem',
                            fontWeight: 300,
                            lineHeight: '75px',
                            marginBottom: '2.4rem'
                        }}
                    >
                        {frontMatter.title}
                    </h1>
                    {frontMatter.subtitle ? (
                        <h2
                            style={{
                                fontFamily: 'Freight Display',
                                fontSize: '1.6rem',
                                fontWeight: 400,
                                marginBottom: '.7rem'
                            }}
                        >
                            {frontMatter.subtitle}
                        </h2>
                    ) : null}
                    <div>
                        <span
                            style={{
                                color: 'var(--text-secondary-color)',
                                fontFamily: 'Freight Sans',
                                fontSize: '1.1rem',
                                fontWeight: 700
                            }}
                        >
                            {formattedDate}
                        </span>
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
