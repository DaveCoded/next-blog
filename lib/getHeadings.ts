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
