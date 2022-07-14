import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import { FrontMatter } from './posts'

export const getPostSlugsForTag = (tag: string) => {
    const postDirectory = path.join(process.cwd(), 'posts')
    const fileNames = fs.readdirSync(postDirectory)

    const result: string[] = []

    fileNames.forEach((filename) => {
        const fullPath = path.join(postDirectory, filename)
        const slug = filename.replace('.mdx', '')

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const data = matter(fileContents).data as FrontMatter
        // Filter for posts that include the tag in their array
        if (data.tags && data.tags.includes(tag)) {
            result.push(slug)
        }
    })

    // Return those posts
    return result
}

export const getAllTags = () => {
    const postDirectory = path.join(process.cwd(), 'posts')
    const fileNames = fs.readdirSync(postDirectory)

    const result: { params: { tag: string } }[] = []

    fileNames.forEach((filename) => {
        const fullPath = path.join(postDirectory, filename)

        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const data = matter(fileContents).data as FrontMatter

        if (data.tags && data.status === 'publish') {
            data.tags.forEach((tag: string) => {
                if (!result.includes({ params: { tag } })) result.push({ params: { tag } })
            })
        }
    })

    // Return those tags
    return result
}

// todo: this could be a blog post?
export const getUniqueTags = () => {
    const tags = getAllTags().map((obj) => obj.params.tag)
    return Array.from(new Set(tags))
}
