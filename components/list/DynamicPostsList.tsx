import styled from 'styled-components'
import Link from 'next/link'
import { PostData } from '../../pages'

type Props = {
    postsToShow: PostData[]
}

export default function DynamicPostsList({ postsToShow }: Props) {
    return (
        <PostsList>
            {postsToShow.map(({ slug, date, title, excerpt, status }) => (
                <li key={slug}>
                    <Post>
                        <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                            <a>
                                <H2>
                                    {title}
                                    {status === 'draft' ? <Draft> Draft</Draft> : null}
                                </H2>
                            </a>
                        </Link>
                        <Excerpt>{excerpt}</Excerpt>
                        <StyledDate>{date}</StyledDate>
                    </Post>
                </li>
            ))}
        </PostsList>
    )
}

const PostsList = styled.ul`
    padding-bottom: var(--space-lg);

    li {
        list-style: none;
    }
`

const Post = styled.div`
    margin-bottom: var(--space-lg);
`

const H2 = styled.h2`
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const StyledDate = styled.span`
    font-size: var(--text-sm);
    color: var(--cool-grey);
`

const Excerpt = styled.p`
    margin: var(--space-xs) 0;
    color: var(--light-grey);
`

const Draft = styled.span`
    color: white;
    font-size: var(--text-xs);
    font-weight: 700;
    vertical-align: super;
    margin-left: var(--space-sm);
    padding-right: var(--space-xxs);
    border: 2px solid red;
    border-radius: 4px;
    background: red;
`
