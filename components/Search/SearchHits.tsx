import Link from 'next/link'
import { connectStateResults } from 'react-instantsearch-dom'
import styled from 'styled-components'
import styles from './SearchHits.module.css'

function Hits({ searchState, searchResults }: any) {
    const hitLength = searchResults?.hits.length
    const validQuery = searchState.query?.length >= 3
    const noHits = validQuery && hitLength === 0
    const showHits = validQuery && hitLength > 0

    return (
        <>
            {noHits && <p>I'm sorry. I don't write that kind of thing.</p>}
            {showHits && (
                <OL>
                    {searchResults.hits.map((hit: any) => (
                        <LI key={hit.objectID}>
                            <Link href={`/blog/${hit.slug}`}>
                                <a style={{ textDecoration: 'none' }}>
                                    <H3>{hit.title}</H3>
                                </a>
                            </Link>
                        </LI>
                    ))}
                </OL>
            )}
        </>
    )
}

const OL = styled.ol`
    border: 2px solid var(--black);
    background-color: hsl(324deg 100% 50% / 6%);
    padding: 1rem 0;
`

const LI = styled.li`
    list-style: none;
    padding: 7px 14px;
    cursor: pointer;

    &:hover {
        background-color: hsl(0deg 78% 91%);
    }
`

const H3 = styled.h3`
    margin: 0;
    font-family: 'century';
    font-size: 1.3rem;
    font-weight: 500;
    text-transform: none;
`

export default connectStateResults(Hits)
