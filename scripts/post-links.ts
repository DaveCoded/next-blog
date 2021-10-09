import fs from 'fs'
import { FireType } from '../components/FireLevel'
import { getSortedPosts } from '../lib/posts'

export type LinkReference = {
    title: string
    slug: string
    excerpt: string
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
        .replaceAll('  ', ' ') // Some double spaces left because of React component indentation
        .replaceAll('[[', '') // Remove brackets from excerpt
        .replaceAll(']]', '')
        .replace(matchCodeBlocks, '') // Remove code blocks
        .trim()

const getExcerpt = (str?: string) => {
    if (!str) return ''
    const stripped = stripExcerpt(str)
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
        outboundLinks: [],
        inboundLinks: []
    }))

    // Get all outbound links
    totalPostData.forEach((postData, index) => {
        const { content } = postData
        // Get all substrings between brackets from post body
        const bracketContents = bracketsExtractor(content)
        bracketContents?.forEach((alias) => {
            // If matched text is an alias of another post
            // todo: Try stripping the whitespace and newlines from both to make the matching fuzzier
            const match = posts.find((p) => {
                const normalisedAlias = alias
                    .replace(/\n/g, '')
                    .replace('  ', ' ')
                    .replace(`{' '}`, ' ')
                    .replace(`{" "}`, ' ')
                return p.ids.includes(normalisedAlias)
            })

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

    // Get inbound links for all posts
    // Loop through each post
    for (let index = 0; index < posts.length; index++) {
        const post = posts[index]
        const postTitle = post.ids[0]

        // Loop through posts again
        for (let j = 0; j < posts.length; j++) {
            const secondPost = posts[j]
            const secondPostTitle = secondPost.ids[0]

            // If inner loop post's outboundLinks contains a reference to the original post,
            // then the original post must have the second post as an inbound link
            if (secondPost.outboundLinks.some((link) => link.title === postTitle)) {
                const matchedPostData = totalPostData.find((p) => p.title === secondPostTitle)
                const excerpt = getExcerpt(matchedPostData?.content)

                post.inboundLinks.push({
                    title: secondPostTitle,
                    excerpt,
                    slug: secondPost.slug,
                    completion: secondPost.completion
                })
            }
        }
    }

    fs.writeFile('links.json', JSON.stringify(posts), () => console.log('links recorded'))
})()
