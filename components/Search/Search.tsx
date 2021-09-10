import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import SearchHits from './SearchHits'

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
)

type Props = {
    tags: string[]
}

export default function Search({ tags }: Props) {
    return (
        <InstantSearch searchClient={searchClient} refresh={false} indexName="dev-blog">
            <SearchContainer>
                <SearchBox />
                <UL>
                    {tags.map((tag, i) => (
                        <Tag key={i}>
                            <Link href={`/tag/${tag}`}>
                                <a>{tag}</a>
                            </Link>
                        </Tag>
                    ))}
                </UL>
            </SearchContainer>
            <SearchHits />
        </InstantSearch>
    )
}

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
`

const UL = styled.ul`
    margin-left: 1.6rem;
    display: flex;
`

const Tag = styled.li`
    list-style: none;
    font-size: 0.9rem;
    font-weight: 600;
    background-color: var(--light-black);
    color: var(--cool-grey);
    border-radius: 10rem;
    padding: 5px 14px;
    transition: var(--link-hover-transition);

    &:hover {
        background-color: #363a3c;
        a {
            color: inherit;
        }
    }

    & + & {
        margin-left: 12px;
    }
`
