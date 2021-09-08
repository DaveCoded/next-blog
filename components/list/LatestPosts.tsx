import { PostData } from '../../pages/blog'

type Props = {
    posts: PostData[]
}

export default function LatestPosts({ posts }: Props) {
    return (
        <>
            {posts.map(({ title, date, tags }) => (
                <article key={title}>
                    <h3>{title}</h3>
                    <span>{date}</span>
                    {tags && tags?.length > 0 && (
                        <ul>
                            {tags.map((tag) => (
                                <li key={tag}>{tag}</li>
                            ))}
                        </ul>
                    )}
                </article>
            ))}
        </>
    )
}
