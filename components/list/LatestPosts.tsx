import styled from 'styled-components'
import Link from 'next/link'
import { PostData } from '../../pages/blog'
import TagPill from '../TagPill'

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
                    <StyledDate>{date}</StyledDate>
                    {tags && tags?.length > 0 && (
                        <UL>
                            {tags.map((tag) => (
                                <TagPill tag={tag} key={tag} />
                            ))}
                        </UL>
                    )}
                </Article>
            ))}
        </>
    )
}

export const Article = styled.article`
    margin-bottom: var(--space-lg);
`

const StyledDate = styled.div`
    line-height: 1.6;
    color: var(--cool-grey);
    margin-bottom: var(--space-xs);
`

export const H3 = styled.h3`
    font-size: var(--text-md);
    font-weight: 600;
    margin-bottom: var(--space-xs);
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const LI = styled.li`
    list-style: none;
    font-size: var(--text-xs);
    font-weight: 600;
    background-color: var(--light-black);
    color: var(--cool-grey);
    border-radius: 100px;
    padding: var(--space-xxs) var(--space-sm);
    transition: var(--link-hover-transition);

    &:hover {
        background-color: #363a3c;
    }
`

const UL = styled.ul`
    display: flex;

    a + a {
        margin-left: 8px;
    }
`
