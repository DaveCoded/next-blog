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

export const Article = styled.article`
    margin-bottom: 2rem;
`

const Span = styled.span`
    color: var(--cool-grey);
`

export const H3 = styled.h3`
    font-weight: 600;
    margin-top: 0;
    margin-bottom: 0.2rem;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const LI = styled.li`
    list-style: none;
    font-size: 0.75rem;
    font-weight: 600;
    background-color: var(--light-black);
    color: var(--cool-grey);
    border-radius: 10rem;
    padding: 4px 11px;
    transition: var(--link-hover-transition);

    &:hover {
        background-color: #363a3c;
    }
`

const UL = styled.ul`
    display: flex;
    margin-top: 0.6rem;

    a + a {
        margin-left: 8px;
    }
`
