import styled from 'styled-components'
import Link from 'next/link'
import TagPill from '../TagPill'
import { PostData } from '../../types/PostData'

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
                    <Metadata>
                        <StyledDate>{date}</StyledDate>
                        {tags && tags?.length > 0 && (
                            <UL>
                                {tags.map((tag) => (
                                    <TagPill tag={tag} key={tag} />
                                ))}
                            </UL>
                        )}
                    </Metadata>
                </Article>
            ))}
        </>
    )
}

export const Article = styled.article`
    margin-bottom: var(--space-md);
`

const StyledDate = styled.div`
    line-height: 1.6;
    color: var(--cool-grey);
    margin-right: var(--space-sm);
`

export const H3 = styled.h3`
    font-size: var(--text-md);
    font-weight: 400;
    margin-bottom: var(--space-xs);
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const Metadata = styled.div`
    display: flex;
    align-items: baseline;
`

const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-sm);
`
