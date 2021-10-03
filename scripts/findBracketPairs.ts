import { getBracketPairs } from '../lib/bracketPairs'
import linksMap from '../links.json'
;(function () {
    const content = linksMap[1].content

    const pairs = getBracketPairs(content)

    pairs.forEach((pair) => {
        console.log('first match:', content[pair[0]])
        console.log('second match:', content[pair[1]])
    })
})()
