import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'
import DynamicPostsList from '../list/DynamicPostsList'
import { PostFileContents } from '@/lib/posts'

type Props = {
    searchState: any
    searchResults: any
    allPostsData: PostFileContents[]
}

function Hits({ searchState, searchResults, allPostsData }: Props) {
    const hitLength = searchResults?.hits.length
    const validQuery = searchState.query?.length >= 3
    const noHits = validQuery && hitLength === 0
    const showHits = validQuery && hitLength > 0
    const postsToShow: PostFileContents[] = showHits ? searchResults.hits : allPostsData

    return (
        <div>
            {noHits && <P>I'm sorry. I don't write that kind of thing.</P>}
            <DynamicPostsList postsToShow={postsToShow} />
        </div>
    )
}

const P = styled.p`
    color: var(--purple);
    font-weight: 700;
    margin-bottom: var(--space-lg);
`

export default connectStateResults(Hits)
