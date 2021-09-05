import Link from 'next/link'
import { connectStateResults } from 'react-instantsearch-dom'
import styles from './SearchHits.module.css'

function Hits({ searchState, searchResults }: any) {
    console.log({ searchResults, searchState })

    const validQuery = searchState.query?.length >= 3

    return (
        <>
            {searchResults?.hits.length === 0 && validQuery && (
                <p>Aw snap! No search results were found.</p>
            )}
            {searchResults?.hits.length > 0 && validQuery && (
                <ol>
                    {searchResults.hits.map((hit: any) => (
                        <li key={hit.objectID} className={styles.SearchHit}>
                            <Link href={`/blog/${hit.slug}`}>
                                <h3 className={styles.Title}>{hit.title}</h3>
                            </Link>
                            {hit.subtitle ? <p>{hit.subtitle}</p> : null}
                        </li>
                    ))}
                </ol>
            )}
        </>
    )
}

export default connectStateResults(Hits)
