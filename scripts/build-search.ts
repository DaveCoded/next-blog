import dotenv from 'dotenv'
import algoliasearch from 'algoliasearch'
import { getSortedPosts } from '../lib/posts'
import { PostData } from '../types/PostData'

function transformPostsToSearchObjects(posts: PostData[]) {
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
            tags: post.tags,
            status: post.status,
            content: post.content
        }
    })

    return transformed
}

;(async function () {
    dotenv.config()

    try {
        const posts = getSortedPosts({ getContent: true })
        const transformed = transformPostsToSearchObjects(posts)
        const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string
        const adminKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string

        // Initialize the client with your environment variables
        const client = algoliasearch(appID, adminKey)

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
