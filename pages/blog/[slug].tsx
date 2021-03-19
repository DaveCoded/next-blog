import Head from 'next/head'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import mdxPrism from 'mdx-prism'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
import AllComponents from '../../components/mdx/AllComponents'
import { getAllPostSlugs, getPostdata } from '../../lib/posts'
import { PostData } from '../'
import { MdxRemote } from 'next-mdx-remote/types'
import styles from './slug.module.css'
// import TableOfContents from '../../components/TableOfContents'

interface Props {
    source: MdxRemote.Source
    frontMatter: PostData
    headings: { text: string; level: number }[]
}

const components = AllComponents

export default function Posts({ source, frontMatter, headings }: Props) {
    const content = hydrate(source, { components })
    const options = { month: 'long', day: 'numeric', year: 'numeric' } as any
    const formattedDate = new Date(frontMatter.date).toLocaleDateString('en-US', options)
    return (
        <>
            <Head>
                <title>Dave Bernhard's blog | {frontMatter.title}</title>
                <meta name="description" content={frontMatter.description}></meta>
            </Head>
            <div className={styles.PageContainer}>
                <div className={styles.TitleContainer}>
                    <h1 className={styles.Title}>{frontMatter.title}</h1>
                    {frontMatter.subtitle ? (
                        <h2 className={`${styles.Subtitle} slugSubtitle`}>
                            {frontMatter.subtitle}
                        </h2>
                    ) : null}
                    <div className={styles.DateContainer}>
                        <span className={styles.Date}>{formattedDate}</span>
                    </div>
                    <div className={styles.Categories}>Some category tags here maybe?</div>
                </div>
                {/* <TableOfContents headings={headings} /> */}
                {content}
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
    return headingLines.map((raw: string) => {
        const text = raw.replace(/^###*\s/, '')
        // I only care about h2 and h3.
        // If I wanted more levels, I'd need to count the
        // number of #s.
        const level = raw.match(/#/g)?.length

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
