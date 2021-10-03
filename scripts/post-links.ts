import fs from 'fs'
import { FireType } from '../components/FireLevel'
import { getSortedPosts } from '../lib/posts'

type LinkReference = {
    matchedId: string
    title: string
    slug: string
    excerpt: string
    completion?: FireType
}

type LinkMap = {
    ids: string[]
    slug: string
    completion?: FireType
    outboundLinks: LinkReference[]
    inboundLinks: LinkReference[]
}

// Extract all instances of substrings between double brackets [[]] in a long string
const bracketsExtractor = (str: string) => {
    const matcher = /((?!\])(?!\[).)+/gs
    return str.match(matcher)
}

const stripJSXAndNewlines = (str: string) =>
    str
        .substring(0, 700) // Work on a smaller substring for efficiency
        .replace(/(<([^>]+)>)/gi, '') // Remove all JSX tags
        .replace(/\r?\n|\r/g, ' ') // Replace all line breaks
        .replace(/{' '}/g, '') // Replace spaces in braces that occur in JSX components
        .replaceAll('  ', ' ') // Some double spaces left because of React component indentation
        .trim()

const getExcerpt = (str?: string) => {
    if (!str) return ''
    const stripped = stripJSXAndNewlines(str)
    return `${stripped.substring(0, 280).trimEnd()}...`
}

;(function () {
    // Get content and frontmatter for each post
    const totalPostData = getSortedPosts({ getContent: true })

    // Create initial objects. Identify each by a combined title and aliases identifier
    // Initialise empty outbound and inbound link arrays
    const posts: LinkMap[] = totalPostData.map(({ title, aliases, slug, completion, content }) => ({
        ids: [title, ...(aliases ? aliases : [])],
        slug,
        completion,
        content,
        outboundLinks: [],
        inboundLinks: []
    }))

    totalPostData.forEach((postData, index) => {
        const { content } = postData
        // Get all substrings between brackets from post body
        const bracketContents = bracketsExtractor(content)
        bracketContents?.forEach((alias) => {
            // If matched text is an alias of another post
            const match = posts.find((p) => p.ids.includes(alias))

            if (match) {
                const matchedPostData = totalPostData.find((p) => p.title === match.ids[0])
                const excerpt = getExcerpt(matchedPostData?.content)
                // Add it to the outbound links
                posts[index]?.outboundLinks.push({
                    matchedId: alias,
                    title: match.ids[0],
                    slug: match.slug,
                    completion: match.completion,
                    excerpt
                })
            }
        })
    })

    fs.writeFile('links.json', JSON.stringify(posts), () => console.log('links recorded'))
})()
