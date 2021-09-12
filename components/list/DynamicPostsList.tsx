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
    margin: 0;
    padding: 4rem 0 5rem;

    li {
        list-style: none;
    }
`

const Post = styled.div`
    margin-bottom: 3.5rem;
`

const H2 = styled.h2`
    margin: 0;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const StyledDate = styled.span`
    font-size: var(--sm-text);
    font-weight: 300;
    color: var(--cool-grey);
`

const Excerpt = styled.p`
    margin: 0.2rem 0 0.4rem;
    color: var(--light-grey);
`

const Draft = styled.span`
    color: white;
    font-family: 'Poppins';
    font-size: 1.1rem;
    font-weight: 800;
    vertical-align: super;
    margin-left: 0.6rem;
    padding-right: 0.3rem;
    border: 2px solid red;
    border-radius: 4px;
    background: red;
`
