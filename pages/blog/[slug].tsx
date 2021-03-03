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
import TableOfContents from '../../components/TableOfContents'

interface Props {
    source: MdxRemote.Source
    frontMatter: PostData
    headings: { text: string; level: number }[]
}

const components = AllComponents

export default function Posts({ source, frontMatter, headings }: Props) {
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
                            fontFamily: 'Playfair Display',
                            fontSize: '4.8rem',
                            fontWeight: 400,
                            lineHeight: 1.2,
                            margin: '4rem 0 1.2rem'
                        }}
                    >
                        {frontMatter.title}
                    </h1>
                    {frontMatter.subtitle ? (
                        <h2
                            className="subtitle"
                            style={{
                                fontFamily: 'Poppins',
                                fontSize: '1.4rem',
                                fontWeight: 200,
                                fontStyle: 'italic',
                                marginTop: 0,
                                marginBottom: '0.5rem'
                            }}
                        >
                            {frontMatter.subtitle}
                        </h2>
                    ) : null}
                    <div style={{ marginBottom: '2.6rem' }}>
                        <span
                            style={{
                                color: 'var(--off-black)',
                                fontFamily: 'Poppins',
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
                            borderTop: '1px solid var(--purple)',
                            borderBottom: '1px solid var(--purple)',
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
                    <TableOfContents headings={headings} />
                    <div>{content}</div>
                </div>
            </div>
        </>
    )
}
export async function getHeadings(source: any) {
    // todo: figure out how this works (console.logs?) then extend to 4th and 5th level headings!
    // Get each line individually, and filter out anything that
    // isn't a heading.
    const headingLines = source.split('\n').filter((line: any) => {
        return line.match(/^###*\s/)
    })

    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    return headingLines.map((raw: any) => {
        const text = raw.replace(/^###*\s/, '')
        // I only care about h2 and h3.
        // If I wanted more levels, I'd need to count the
        // number of #s.
        const level = raw.slice(0, 3) === '###' ? 3 : 2

        return { text, level }
    })
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
    // todo: figure out if getting the headings is a good idea or not!
    const headings = await getHeadings(content)
    const mdxSource = await renderToString(content, {
        components,
        mdxOptions: {
            remarkPlugins: [require('remark-code-titles')],
            rehypePlugins: [
                mdxPrism,
                require('rehype-slug'),
                require('rehype-autolink-headings'),
                require('rehype-toc')
            ]
        },
        scope: data
    })
    return {
        props: {
            source: mdxSource,
            frontMatter: data,
            headings
        }
    }
}
