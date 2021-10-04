/**
 * @param value Markdown string
 * @returns Array of index pairs for the second opening brace matched with the second closing brace
 */
export const getBracketPairs = (value: string) => {
    // todo: exclude code samples (with single backticks - `some code` - and triple backticks ```A code block```)
    // When looping through, if char is a backtick, check the next two characters.
    // If they are, don't match square brackets until another three backticks are encountered
    // If only one backtick is found, then don't match square brackets until another is found
    // If two are found in a row, continue as normal

    const bracketPairs: number[][] = []
    if (value) {
        let pointer = 0
        let lastChar = ''
        let bracketStart = -1
        let codeBlock = ''
        while (pointer < value.length) {
            const char = value[pointer]

            // * This appalling code is to skip matching any double brackets inside of code blocks
            if (char === '`') {
                if (value[pointer + 1] === '`' && value[pointer + 2] === '`') {
                    if (codeBlock === '```') {
                        codeBlock = ''
                    } else {
                        codeBlock = '```'
                    }
                    pointer += 2
                } else {
                    if (codeBlock === '`') {
                        codeBlock = ''
                    } else {
                        codeBlock = '`'
                    }
                }
            }

            if (!codeBlock) {
                if (char === '[') {
                    if (lastChar !== '[[') {
                        if (value[pointer - 1] === '[') {
                            lastChar = '[['
                            bracketStart = pointer
                        } else {
                            lastChar = '['
                            bracketStart = pointer
                        }
                    }
                } else if (char === ']' && value[pointer - 1] === ']') {
                    if (lastChar !== '') {
                        // We have a pair
                        lastChar = ''
                        bracketPairs.push([bracketStart, pointer])
                        bracketStart = -1
                    }
                }
            }
            pointer++
        }
    }

    return bracketPairs
}
