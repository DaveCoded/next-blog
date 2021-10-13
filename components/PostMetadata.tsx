import styled from 'styled-components'
import Link from 'next/link'
import FireLevel, { FireType } from './FireLevel'
import { timeAgo } from '../lib/dates'

type Props = {
    date: string
    completion: FireType
    updated?: string
    tags?: string[]
}

export default function PostMetadata({ tags, completion, date, updated }: Props) {
    const firstLitDate = new Date(date)
    const formattedLitDate = firstLitDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    })
    const lastStoked = (updated && timeAgo(new Date(updated))) || null

    return (
        <Metadata>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
                Tags:
                {tags && tags.length > 0 ? (
                    <TagList>
                        {tags.map((tag) => (
                            <Link key={tag} href={`/tag/${tag}`}>
                                <a>
                                    <Tag>{tag}</Tag>
                                </a>
                            </Link>
                        ))}
                    </TagList>
                ) : null}
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
        </Metadata>
    )
}

const Metadata = styled.div`
    display: flex;
    align-items: baseline;
    margin-top: var(--space-md);
    font-weight: 600;
    font-size: var(--text-sm);
    margin-bottom: var(--space-xxl);

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
    margin-left: var(--space-sm);
    display: flex;
    gap: var(--space-sm);
`
