import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import SearchHits from './SearchHits'
import TagPill from '../TagPill'
import { PostData } from '../../types/PostData'

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
        <div>
            <TagsContainer>
                <span>Topics: </span>
                <UL>
                    {tags.map((tag) => (
                        <TagPill tag={tag} key={tag} />
                    ))}
                </UL>
            </TagsContainer>
            <InstantSearch searchClient={searchClient} refresh={false} indexName="dev-blog">
                <SearchContainer>
                    <SearchBox />
                </SearchContainer>
                <SearchHits allPostsData={allPostsData} />
            </InstantSearch>
        </div>
    )
}

const TagsContainer = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: var(--space-lg);
`

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: var(--space-xl);

    @media (max-width: 630px) {
        flex-direction: column;
        align-items: initial;
    }
`

const UL = styled.ul`
    display: flex;
    align-items: baseline;
    margin-left: var(--space-sm);
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 630px) {
        margin-left: 0;
        margin-top: var(--space-sm);
    }
`
