import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

type Data = {
    [key: string]: any
}

export const shouldNotPublish = (data: Data) =>
    process.env.NODE_ENV === 'production' && data.status !== 'publish'

// Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'posts')

export const getSortedPosts = () => {
    // Reads all the files in the post directory
    const fileNames = fs.readdirSync(postDirectory)
    const published: any[] = []
    fileNames.forEach((filename) => {
        const slug = filename.replace('.mdx', '')
        const fullPath = path.join(postDirectory, filename)

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
        if (shouldNotPublish(data)) {
            return
        }
        const options = { month: 'long', day: 'numeric', year: 'numeric' }
        const formattedDate = new Date(data.date).toLocaleDateString('en-US', options as any)
        const frontmatter = {
            ...data,
            date: formattedDate
        }
        published.push({
            slug,
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
        const slug = filename.replace('.mdx', '')
        const fullPath = path.join(postDirectory, filename)

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)
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
