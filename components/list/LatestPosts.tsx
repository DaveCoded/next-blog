import styled from 'styled-components'
import Link from 'next/link'
import { PostData } from '../../pages/blog'

type Props = {
    posts: PostData[]
}

export default function LatestPosts({ posts }: Props) {
    return (
        <>
            {posts.map(({ title, date, tags }) => (
                <article key={title}>
                    <H3>{title}</H3>
                    <Span>{date}</Span>
                    {tags && tags?.length > 0 && (
                        <UL>
                            {tags.map((tag) => (
                                <LI key={tag}>
                                    <Link href={`/tag/${tag}`}>
                                        <a>{tag}</a>
                                    </Link>
                                </LI>
                            ))}
                        </UL>
                    )}
                </article>
            ))}
        </>
    )
}

const H3 = styled.h3`
    margin-bottom: 0.4rem;
`

const Span = styled.span`
    font-size: 1rem;
`

const LI = styled.li`
    list-style: none;
    font-size: 0.8rem;
    border: 2px solid var(--black);
    border-radius: 10rem;
    padding: 1px 10px;
`

const UL = styled.ul`
    display: flex;

    ${LI} + ${LI} {
        margin-left: 8px;
    }
`
