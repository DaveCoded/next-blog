import linkMaps from '../links.json'
import { getBracketPairs } from './bracketPairs'

export function linkify(content: string, title: string) {
    if (!content) return content
    // ? How will this fail if opening braces are found with no matching closing brace?
    // First matched brackets will correspond to first outbound link
    // Replace first bracket of open and close doubles
    // Append (link)
    const matchingBracketPairs = getBracketPairs(content)
    if (matchingBracketPairs.length < 1) return content

    console.log('matchingBracketPairs', matchingBracketPairs)

    let result = ''
    let previousIndex = 0

    matchingBracketPairs.forEach((pair, index) => {
        const opening = pair[0]
        const closing = pair[1]
        // Get corresponding outbound link
        const outboundLinks = linkMaps.find((map) => map.ids[0] === title)?.outboundLinks
        if (outboundLinks && outboundLinks.length > 0) {
            const slug = outboundLinks[index].slug
            result += content.substring(previousIndex, opening - 1)
            result += content.substring(opening, closing)
            result += `(/blog/${slug})`
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
