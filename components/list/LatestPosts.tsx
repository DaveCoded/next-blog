import styled from 'styled-components'
import Link from 'next/link'
import { PostData } from '../../pages/blog'

type Props = {
    posts: PostData[]
}

export default function LatestPosts({ posts }: Props) {
    return (
        <>
            {posts.map(({ title, date, slug, tags }) => (
                <Article key={title}>
                    <Link href={`/blog/${slug}`}>
                        <a>
                            <H3>{title}</H3>
                        </a>
                    </Link>
                    <Span>{date}</Span>
                    {tags && tags?.length > 0 && (
                        <UL>
                            {tags.map((tag) => (
                                <Link href={`/tag/${tag}`} key={tag}>
                                    <a>
                                        <LI>{tag}</LI>
                                    </a>
                                </Link>
                            ))}
                        </UL>
                    )}
                </Article>
            ))}
        </>
    )
}

const Article = styled.article`
    margin-bottom: 2rem;
`

const H3 = styled.h3`
    font-weight: 400;
    margin-bottom: 0.6rem;
`

const Span = styled.span`
    font-size: 0.95rem;
    color: #525252;
`

const LI = styled.li`
    list-style: none;
    font-size: 0.75rem;
    border: 1px solid var(--black);
    border-radius: 10rem;
    padding: 4px 10px;
`

const UL = styled.ul`
    display: flex;
    margin-top: 0.6rem;

    a + a {
        margin-left: 8px;
    }
`
