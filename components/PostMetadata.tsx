import styled from 'styled-components'
import Link from 'next/link'
import FireLevel, { FireType } from './FireLevel'
import { formatDateYear, timeAgo } from '../lib/dates'
import ReadingTime from './ReadingTime'

type Props = {
    date: string
    completion: FireType
    readingTime: string
    updated?: string
    tags?: string[]
}

export default function PostMetadata({ tags, completion, readingTime, date, updated }: Props) {
    const hasTags = tags && tags.length > 0
    const formattedLitDate = formatDateYear(date)
    const lastStoked = (updated && timeAgo(new Date(updated))) || null

    return (
        <Metadata>
            <TagsAndCompletion>
                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                    {hasTags ? (
                        <TagList>
                            {tags.map((tag) => (
                                <Link key={tag} href={`/tag/${tag}`}>
                                    <a>
                                        <Tag>{tag}</Tag>
                                    </a>
                                </Link>
                            ))}
                        </TagList>
                    ) : (
                        <ReadingTime readingTime={readingTime} />
                    )}
                </div>
                <InnerMetadata>
                    <FireWrapper>
                        <FireLevel completion={completion} />
                    </FireWrapper>
                    <Pipe>|</Pipe>
                    <DateWrapper>
                        <FirstLit>First lit on {formattedLitDate}</FirstLit>
                        {updated && <span>Last stoked {lastStoked}</span>}
                    </DateWrapper>
                </InnerMetadata>
            </TagsAndCompletion>
            {hasTags && <ReadingTime readingTime={readingTime} />}
        </Metadata>
    )
}

const Metadata = styled.div`
    margin-top: var(--space-md);
    margin-bottom: var(--space-xxl);
    font-size: var(--text-sm);
    line-height: 1.3;
`

const TagsAndCompletion = styled.div`
    display: flex;
    align-items: baseline;
    font-weight: 600;

    @media (max-width: 900px) {
        flex-direction: column;
    }
`

const InnerMetadata = styled.div`
    margin-left: auto;
    display: flex;
    align-items: baseline;

    @media (max-width: 900px) {
        flex-direction: column;
        margin-left: 0;
    }
`

const Tag = styled.li`
    font-style: italic;
    font-size: var(--text-sm);
    font-weight: 600;
    list-style: none;
    color: var(--light-black);
    text-decoration: underline;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--link-pink);
    }
`

const FireWrapper = styled.span`
    margin-left: auto;

    @media (max-width: 900px) {
        margin-left: 0;
    }
`

const Pipe = styled.span`
    margin: 0 var(--space-xs);

    @media (max-width: 900px) {
        display: none;
    }
`

const DateWrapper = styled.span`
    display: flex;
    flex-direction: column;
    text-align: right;

    @media (max-width: 900px) {
        text-align: left;
    }
`

const FirstLit = styled.span`
    margin-bottom: var(--space-xxs);
`

const TagList = styled.ul`
    display: flex;
    gap: var(--space-sm);
`
