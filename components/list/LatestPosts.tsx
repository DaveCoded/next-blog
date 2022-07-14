import styled from 'styled-components'
import Link from 'next/link'
import SubjectTag from '@/components/SubjectTag'
import { formatDateYear } from '@/lib/dates'
import { PostFileContents } from '@/lib/posts'
import SnippetPill from '@/components/SnippetPill'
import DraftPill from '@/components/DraftPill'

type Props = {
    posts: PostFileContents[]
}

export default function LatestPosts({ posts }: Props) {
    return (
        <>
            {posts.map(({ title, date, slug, tags, status, codeSnippet }) => (
                <Article key={title}>
                    <Link href={`/blog/${slug}`}>
                        <a>
                            <TitleContainer>
                                <H3>
                                    {title}
                                    {codeSnippet && <SnippetPill />}
                                    {status === 'draft' && <DraftPill />}
                                </H3>
                            </TitleContainer>
                        </a>
                    </Link>
                    <Metadata>
                        <StyledDate>{formatDateYear(date)}</StyledDate>
                        {tags && tags?.length > 0 && (
                            <UL>
                                {tags.map((tag) => (
                                    <SubjectTag tag={tag} key={tag} />
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
    margin-bottom: var(--space-lg);
`

const TitleContainer = styled.div`
    position: relative;
`

const StyledDate = styled.div`
    line-height: 1.6;
    color: var(--cool-grey);
    margin-right: var(--space-sm);
`

export const H3 = styled.h3`
    font-size: var(--text-md);
    font-weight: 400;
    margin-bottom: var(--space-xxs);
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--purple);
    }
`

const Metadata = styled.div`
    display: flex;
    align-items: baseline;
    font-weight: 600;
`

const UL = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 0 var(--space-sm);
`
