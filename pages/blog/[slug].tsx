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

interface Props {
    source: MdxRemote.Source
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
                            fontFamily: 'Reforma',
                            fontSize: '4.3rem',
                            fontWeight: 300,
                            lineHeight: '5.5rem',
                            margin: '4rem 0 0.6rem'
                        }}
                    >
                        {frontMatter.title}
                    </h1>
                    {frontMatter.subtitle ? (
                        <h2
                            className="subtitle"
                            style={{
                                fontFamily: 'Reforma',
                                fontSize: '1.6rem',
                                fontWeight: 300,
                                fontStyle: 'italic',
                                marginTop: 0,
                                marginBottom: '.7rem'
                            }}
                        >
                            {frontMatter.subtitle}
                        </h2>
                    ) : null}
                    <div style={{ marginBottom: '2.6rem' }}>
                        <span
                            style={{
                                color: 'var(--off-black)',
                                fontFamily: 'Freight Sans',
                                fontSize: '1.2rem',
                                fontWeight: 700,
                                letterSpacing: '0.4px',
                                marginBottom: '2rem'
                            }}
                        >
                            {formattedDate}
                        </span>
                    </div>
                    <div
                        style={{
                            borderTop: '1px solid var(--accent-blue)',
                            borderBottom: '1px solid var(--accent-blue)',
                            height: '32px',
                            lineHeight: '30px',
                            fontSize: '10px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                        }}
                    >
                        Some category tags here maybe?
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
