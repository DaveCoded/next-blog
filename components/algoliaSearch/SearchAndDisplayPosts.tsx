import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import SearchHits from './SearchHits'
import { PostData } from '../../pages'
import TagPill from '../TagPill'

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY!
)

type Props = {
    tags: string[]
    allPostsData: PostData[]
}

export default function SearchAndDisplayPosts({ tags, allPostsData }: Props) {
    return (
        <InstantSearch searchClient={searchClient} refresh={false} indexName="dev-blog">
            <SearchContainer>
                <SearchBox />
                <UL>
                    {tags.map((tag) => (
                        <TagPill tag={tag} key={tag} />
                    ))}
                </UL>
            </SearchContainer>
            <SearchHits allPostsData={allPostsData} />
        </InstantSearch>
    )
}

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: var(--space-lg);
`

const UL = styled.ul`
    margin-left: var(--space-sm);
    display: flex;

    a + a {
        margin-left: var(--space-sm);
    }
`
