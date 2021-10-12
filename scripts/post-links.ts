import fs from 'fs'
import { FireType } from '../components/FireLevel'
import { getSortedPosts, PostFileContents } from '../lib/posts'
import unified from 'unified'
import parse from 'remark-parse'
// import remark2react from 'remark-react'
import rehype from 'remark-rehype'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'

const markdownToHTML = (markdown: string) =>
    unified()
        .use(parse)
        .use(rehype)
        .use(rehypeFormat)
        .use(rehypeStringify)
        .processSync(markdown)
        .toString()

export type LinkReference = {
    title: string
    slug: string
    excerpt: any
    matchedId?: string
    completion?: FireType
}

type LinkMap = {
    ids: string[]
    slug: string
    completion?: FireType
    outboundLinks: LinkReference[]
    inboundLinks: LinkReference[]
}

// Extract all instances of substrings between double brackets [[]] from a long string
const bracketsExtractor = (str: string) => {
    const matcher = /((?!\])(?!\[).)+/gs
    return str.match(matcher)
}

const matchCodeBlocks = new RegExp('```[\\d\\D]*?```', 'g')

/**
 * I need to work out rendering the html previews for excerpts. Until then, this function
 * is for stripping out JSX tags, newline characters, extra spaces, double brackets and code
 * blocks so that an excerpt can be shown as a string of content.
 * @param str raw markdown string
 * @returns stripped string
 */
const stripExcerpt = (str: string) =>
    str
        .substring(0, 700) // Work on a smaller substring for efficiency
        .replace(/(<([^>]+)>)/gi, '') // Remove all JSX tags
        .replace(/\r?\n|\r/g, ' ') // Replace all line breaks
        .replace(/{' '}/g, '') // Replace spaces in braces that occur in JSX components
        .replace(/\s+/g, ' ') // Replaces all whitespace exceeding one space character
        .replaceAll('[[', '') // Remove brackets from excerpt
        .replaceAll(']]', '')
        .replace(matchCodeBlocks, '') // Remove code blocks
        .trim()

const getExcerpt = (str?: string) => {
    if (!str) return ''
    const HTMLPreview = markdownToHTML(str)
    console.log('HTMLPreview', HTMLPreview)
    // const stripped = stripExcerpt(str)
    // return `${stripped.substring(0, 280).trimEnd()}...`
    return HTMLPreview
}

const getOutboundLinks = (totalPostData: PostFileContents[], posts: LinkMap[]) =>
    totalPostData.forEach((postData, index) => {
        const { content } = postData
        // Get all substrings between brackets from post body
        const bracketContents = bracketsExtractor(content)
        bracketContents?.forEach((alias) => {
            // If matched text is an alias of another post
            const match = posts.find((p) => {
                // If an alias was found between JSX tags in the markdown string, it may contain undesirable substrings
                const normalisedAlias = alias
                    .replace(/\n/g, '')
                    .replace(/\s+/g, ' ') // Replaces all whitespace exceeding one space character
                    .replace(`{' '}`, ' ')
                    .replace(`{" "}`, ' ')
                return p.ids.includes(normalisedAlias)
            })

            if (match) {
                // Get data for post that was referenced in the link
                const matchedPostData = totalPostData.find((p) => p.title === match.ids[0])
                const excerpt = getExcerpt(matchedPostData?.content)
                // Add it to the outbound links
                posts[index].outboundLinks.push({
                    matchedId: alias,
                    title: match.ids[0],
                    slug: match.slug,
                    completion: match.completion,
                    excerpt
                })
            }
        })
    })

const getInboundLinks = (totalPostData: PostFileContents[], posts: LinkMap[]) => {
    for (const outerPost of posts) {
        const outerPostTitle = outerPost.ids[0]

        for (const innerPost of posts) {
            const innerPostTitle = innerPost.ids[0]

            // If inner post's outboundLinks contains a reference to the outer post,
            // then the outer post must have the inner post as an inbound link
            if (innerPost.outboundLinks.some((link) => link.title === outerPostTitle)) {
                const matchedPostData = totalPostData.find((p) => p.title === innerPostTitle)
                const excerpt = getExcerpt(matchedPostData?.content)

                outerPost.inboundLinks.push({
                    title: innerPostTitle,
                    excerpt,
                    slug: innerPost.slug,
                    completion: innerPost.completion
                })
            }
        }
    }
}

;(function () {
    // Get content and frontmatter for each post
    const totalPostData = getSortedPosts({ getContent: true })

    // Create initial objects. Identify each by a combined title and aliases identifier
    // Initialise empty outbound and inbound link arrays
    const posts: LinkMap[] = totalPostData.map(({ title, aliases, slug, completion }) => ({
        ids: [title, ...(aliases ? aliases : [])],
        slug,
        completion,
        outboundLinks: [],
        inboundLinks: []
    }))

    // Get all outbound links
    getOutboundLinks(totalPostData, posts)
    getInboundLinks(totalPostData, posts)

    fs.writeFile('links.json', JSON.stringify(posts), () => console.log('links recorded'))
})()
