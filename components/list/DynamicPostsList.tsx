import styled from 'styled-components'
import Link from 'next/link'
import { formatDateYear } from '@/lib/dates'
import { PostFileContents } from '@/lib/posts'
import SnippetPill from '@/components/SnippetPill'
import DraftPill from '@/components/DraftPill'

type Props = {
    postsToShow: PostFileContents[]
}

export default function DynamicPostsList({ postsToShow }: Props) {
    return (
        <PostsList>
            {postsToShow.map(({ slug, date, title, excerpt, status, codeSnippet }) => {
                const formattedDate = formatDateYear(date)

                return (
                    <li key={slug}>
                        <div>
                            <Link href="/blog/[slug]" as={`/blog/${slug}`}>
                                <a>
                                    <H2>
                                        {title}
                                        {codeSnippet && <SnippetPill />}
                                        {status === 'draft' && <DraftPill />}
                                    </H2>
                                </a>
                            </Link>
                            <Excerpt>{excerpt}</Excerpt>
                            <StyledDate>{formattedDate}</StyledDate>
                        </div>
                    </li>
                )
            })}
        </PostsList>
    )
}

const PostsList = styled.ul`
    line-height: 1;

    li + li {
        margin-top: var(--space-lg);
    }

    li {
        list-style: none;
    }
`

const H2 = styled.h2`
    font-weight: 600;
    color: var(--light-grey);
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
    line-height: 1.4;
`
