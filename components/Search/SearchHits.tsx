import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'
import { PostData } from '../../pages'
import DynamicPostsList from '../list/DynamicPostsList'

type Props = {
    searchState: any
    searchResults: any
    allPostsData: PostData[]
}

function Hits({ searchState, searchResults, allPostsData }: Props) {
    const hitLength = searchResults?.hits.length
    const validQuery = searchState.query?.length >= 3
    const noHits = validQuery && hitLength === 0
    const showHits = validQuery && hitLength > 0
    const postsToShow: PostData[] = showHits ? searchResults.hits : allPostsData

    return (
        <Container>
            {noHits && <P>I'm sorry. I don't write that kind of thing.</P>}
            <DynamicPostsList postsToShow={postsToShow} />
        </Container>
    )
}

const Container = styled.div`
    margin-top: 1rem;
    /* This is to prevent layout shift while searching. But it shoves the footer to
       the bottom of the page. Make it the height of 5 posts when you have 5 posts */
    min-height: 40rem;
`

const P = styled.p`
    color: var(--purple);
    font-weight: 700;
    margin-left: 14px;
`

export default connectStateResults(Hits)
