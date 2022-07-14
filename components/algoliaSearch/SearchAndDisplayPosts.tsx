import algoliasearch from 'algoliasearch/lite'
import { InstantSearch } from 'react-instantsearch-dom'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import SearchHits from './SearchHits'
import SubjectTag from '../SubjectTag'
import { PostFileContents } from '@/lib/posts'

const searchClient = algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY
)

type Props = {
    tags: string[]
    allPostsData: PostFileContents[]
}

export default function SearchAndDisplayPosts({ tags, allPostsData }: Props) {
    return (
        <div>
            <TagsContainer>
                <span>Topics: </span>
                <UL>
                    {tags.map((tag) => (
                        <SubjectTag tag={tag} key={tag} />
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
    margin-bottom: var(--space-xl);
`

const UL = styled.ul`
    display: flex;
    align-items: baseline;
    margin-left: var(--space-sm);
    gap: var(--space-sm);
    flex-wrap: wrap;

    @media (max-width: 630px) {
        margin-top: var(--space-sm);
    }
`
