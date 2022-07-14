export function getHeadings(source: string) {
    // Get each line individually, and filter out anything that
    // isn't a heading.
    const headingLines = source.split('\n').filter((line) => {
        return /^###*\s/.exec(line)
    })
    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    return headingLines.map((raw: string) => {
        const text = raw.replace(/^#+\s/, '')
        const level = raw.match(/#/g)?.length
        return { text, level }
    })
}
