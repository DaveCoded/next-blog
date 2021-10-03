import linkMaps from '../links.json'
import { getBracketPairs } from './bracketPairs'

export function linkify(content: string, title: string) {
    if (!content) return content

    const matchingBracketPairs = getBracketPairs(content)
    if (matchingBracketPairs.length < 1) return content

    let result = ''
    let previousIndex = 0

    matchingBracketPairs.forEach((pair, index) => {
        const opening = pair[0]
        const closing = pair[1]
        // Get corresponding outbound link
        const outboundLinks = linkMaps.find((map) => map.ids[0] === title)?.outboundLinks

        // * This is very far from generic. Since we want a tooltip to wrap the link, we have to
        // * make sure the tooltip is also provided to MDXRemote, so that it knows to transform it
        // * Also, this means that the tooltip's children can't be treated as markdown (unless we
        // * want to parse them?) and so the link cannot take the form [I am a link](https://www.link.to)
        // * but instead must be a Next Link component, which currently, must ALSO be passed to MDX remote :(

        if (outboundLinks && outboundLinks.length > 0) {
            const { slug, excerpt, title } = outboundLinks[index]
            result += content.substring(previousIndex, opening - 1)
            result += `<Tooltip content={<div><div><strong>${title}</strong></div>${excerpt}</div>}><InternalLink href={'/blog/${slug}'}>`
            result += content.substring(opening + 1, closing - 1)
            result += '</InternalLink></Tooltip>'
        } else {
            result += content.substring(previousIndex, closing)
        }
        previousIndex = closing + 1
    })

    const numPairs = matchingBracketPairs.length
    const lastClosingBracket = matchingBracketPairs[numPairs - 1][1]

    // Content from last closing bracket of last link to end of content
    result += content.substring(lastClosingBracket + 1, content.length - 1)

    return result
}
