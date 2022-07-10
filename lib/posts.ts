import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { FireType } from '../components/FireLevel'
import { formatDate } from './dates'

export type FrontMatter = {
    title: string
    date: string
    tags: string[]
    keywords: string
    content: string
    aliases?: string[]
    subtitle?: string
    excerpt?: string
    description?: string
    status?: 'publish' | 'draft'
    completion?: FireType
    updated?: string
    hideTOC?: boolean
}

export type PostFileContents = FrontMatter & {
    slug: string
}

export const shouldNotPublish = (data: FrontMatter) =>
    process.env.NODE_ENV === 'production' && data.status !== 'publish'

// Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'posts')

type Options = {
    getContent: boolean
}

export const getSortedPosts = (options: Partial<Options> = {}) => {
    // Reads all the files in the post directory
    const fileNames = fs.readdirSync(postDirectory)
    const published: PostFileContents[] = []

    fileNames.forEach((filename) => {
        const slug = filename.replace('.mdx', '')
        const fullPath = path.join(postDirectory, filename)

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { content } = matter(fileContents)
        const data = matter(fileContents).data as FrontMatter
        if (shouldNotPublish(data)) {
            return
        }
        const frontmatter = {
            ...data,
            date: formatDate(data.date)
        }
        published.push({
            slug,
            ...(options.getContent && { content }),
            ...frontmatter
        })
    })

    return published.sort((a, b) => {
        if (new Date(a.date) < new Date(b.date)) {
            return 1
        } else {
            return -1
        }
    })
}

// Get Slugs
export const getAllPostSlugs = () => {
    const fileNames = fs.readdirSync(postDirectory)
    const published: string[] = []
    fileNames.forEach((filename) => {
        const fullPath = path.join(postDirectory, filename)

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const data = matter(fileContents).data as FrontMatter
        if (shouldNotPublish(data)) {
            return
        }

        published.push(filename)
    })

    return published.map((filename) => {
        return {
            params: {
                slug: filename.replace('.mdx', '')
            }
        }
    })
}

// Get Post based on Slug
export const getPostdata = async (slug: string) => {
    const fullPath = path.join(postDirectory, `${slug}.mdx`)
    const postContent = fs.readFileSync(fullPath, 'utf8')
    return postContent
}
