import linkMaps from '../links.json'
import { LinkReference } from '../scripts/post-links'
import { getBracketPairs } from './bracketPairs'

/**
 * This replaces double bracketed links [[like this one]] in the markdown for
 * JSX elements that link to the referenced blog post. It also adds a tooltip
 * to the links in order to preview the title and an excerpt from the post
 * @param content : markdown string for a blog post
 * @param title
 * @returns transformed markdown string for blog post
 * @deprecated
 */
export function linkify(content: string, title: string) {
    if (!content) return content

    const matchingBracketPairs = getBracketPairs(content)
    if (matchingBracketPairs.length < 1) return content

    // Get all outbound links for this post
    const outboundLinks = linkMaps.find((map) => map.ids[0] === title)?.outboundLinks

    let result = ''
    let previousIndex = 0 // Starts from first character of the content string

    // For each pair of brackets (link) found, append the content found before to the result,
    // then append the link itself with JSX replacing the brackets, then append the rest of
    // the markdown string until the next pair of brackets
    matchingBracketPairs.forEach((pair) => {
        const opening = pair[0]
        const closing = pair[1]
        const foundLinkText = content.substring(opening + 1, closing - 1)
        const matchedOutboundLink =
            outboundLinks &&
            (outboundLinks as LinkReference[]).find(
                (ol) => ol.matchedId?.toLowerCase() === foundLinkText.toLowerCase()
            )

        if (matchedOutboundLink) {
            const { slug, excerpt, title } = matchedOutboundLink

            result += content.substring(previousIndex, opening - 1) // append content up to link
            result += `<BacklinkTooltip content={<div><div><strong>${title}</strong></div>${excerpt}</div>}><InternalLink href={'/blog/${slug}'}>` // append JSX opening tags
            result += content.substring(opening + 1, closing - 1) // skip opening brackets, then append link content (referenced post title or alias)
            result += '</InternalLink></BacklinkTooltip>' // append JSX closing tags
        } else {
            result += content.substring(previousIndex, closing)
        }
        previousIndex = closing + 1 // skip closing brackets and start new loop until reaching end of the bracket pairs
    })

    const numPairs = matchingBracketPairs.length
    const lastClosingBracket = matchingBracketPairs[numPairs - 1][1]

    // Append content from last bracket pair to end of content
    result += content.substring(lastClosingBracket + 1, content.length - 1)

    return result
}
