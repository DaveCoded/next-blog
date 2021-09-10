import Link from 'next/link'
import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'

function Hits({ searchState, searchResults }: any) {
    const hitLength = searchResults?.hits.length
    const validQuery = searchState.query?.length >= 3
    const noHits = validQuery && hitLength === 0
    const showHits = validQuery && hitLength > 0
    if (!validQuery) return null

    return (
        <Container>
            {noHits && <P>I'm sorry. I don't write that kind of thing.</P>}
            {showHits && (
                <OL>
                    {searchResults.hits.map((hit: any, i: number) => (
                        <LI key={hit.objectID}>
                            <Link href={`/blog/${hit.slug}`}>
                                <a style={{ textDecoration: 'none' }}>
                                    <Hit>{hit.title}</Hit>
                                </a>
                            </Link>
                        </LI>
                    ))}
                </OL>
            )}
        </Container>
    )
}

const Container = styled.div`
    margin-top: 1rem;
    border: 2px solid var(--dark-grey);
    border-radius: 4px;
    background-color: var(--light-black);
`

const P = styled.p`
    color: var(--purple);
    font-weight: 700;
    margin-left: 14px;
`

const OL = styled.ol`
    padding: 0;
    margin: 0;
`

const LI = styled.li`
    list-style: none;
    padding: 7px 14px;
    cursor: pointer;
    transition: var(--link-hover-transition);

    &:first-of-type {
        padding-top: 1rem;
    }

    &:last-of-type {
        padding-bottom: 1rem;
    }

    &:hover {
        background-color: var(--black-background);
    }
`

const Hit = styled.p`
    margin: 0;
    font-size: 1.2rem;
    text-transform: none;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--teal);
    }
`

export default connectStateResults(Hits)
