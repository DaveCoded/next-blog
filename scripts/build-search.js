const dotenv = require('dotenv')
const algoliasearch = require('algoliasearch/lite')
const path = require('path')
const fs = require('fs')
const matter = require('gray-matter')

const shouldNotPublish = (data) =>
    process.env.NODE_ENV === 'production' && data.status !== 'publish'

// Finding directory named "posts" from the current working directory of Node.
const postDirectory = path.join(process.cwd(), 'posts')

const getSortedPosts = () => {
    // Reads all the files in the post directory
    const fileNames = fs.readdirSync(postDirectory)
    const published = []
    fileNames.forEach((filename) => {
        const slug = filename.replace('.mdx', '')
        const fullPath = path.join(postDirectory, filename)

        // Extracts contents of the MDX file
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)
        if (shouldNotPublish(data)) {
            return
        }
        const options = { month: 'long', day: 'numeric', year: 'numeric' }
        const formattedDate = new Date(data.date).toLocaleDateString('en-US', options)
        const frontmatter = {
            ...data,
            date: formattedDate
        }
        published.push({
            slug,
            ...frontmatter,
            content
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

function transformPostsToSearchObjects(posts) {
    const transformed = posts.map((post) => {
        const postId = post.title.toLowerCase().replace(/\s/g, '-')

        return {
            objectID: postId,
            slug: post.slug,
            title: post.title,
            subtitle: post.subtitle,
            description: post.description,
            excerpt: post.excerpt,
            date: post.date,
            content: post.content
        }
    })

    return transformed
}

;(async function () {
    dotenv.config()

    try {
        const posts = getSortedPosts()
        const transformed = transformPostsToSearchObjects(posts)

        // Initialize the client with your environment variables
        const client = algoliasearch(
            process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
            process.env.ALGOLIA_SEARCH_ADMIN_KEY
        )

        // Initialize the index with your index name
        const index = client.initIndex('dev-blog')

        // Save the objects!
        const algoliaResponse = await index.saveObjects(transformed)

        // Check the output of the response in the console
        console.log(
            `🎉 Sucessfully added ${
                algoliaResponse.objectIDs.length
            } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join('\n')}`
        )
    } catch (error) {
        console.log(error)
    }
})()
