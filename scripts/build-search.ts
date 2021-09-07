import dotenv from 'dotenv'
import algoliasearch from 'algoliasearch'
import { getSortedPosts } from '../lib/posts'
import { PostData } from '../pages'

function transformPostsToSearchObjects(posts: (PostData & { content: string })[]) {
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
        const appID = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string
        const adminKey = process.env.ALGOLIA_SEARCH_ADMIN_KEY as string

        const client = algoliasearch(appID, adminKey)
        const index = client.initIndex('dev-blog')
        const algoliaResponse = await index.saveObjects(transformed)

        console.log(
            `🎉 Sucessfully added ${
                algoliaResponse.objectIDs.length
            } records to Algolia search. Object IDs:\n${algoliaResponse.objectIDs.join('\n')}`
        )
    } catch (error) {
        console.log(error)
    }
})()
