import Link from 'next/link'
import { connectStateResults } from 'react-instantsearch-dom'
import styles from './SearchHits.module.css'

function Hits({ searchState, searchResults }: any) {
    const validQuery = searchState.query?.length >= 3

    return (
        <>
            {searchResults?.hits.length === 0 && validQuery && (
                <p>Aw snap! No search results were found.</p>
            )}
            {searchResults?.hits.length > 0 && validQuery && (
                <ol className={styles.HitList}>
                    {searchResults.hits.map((hit: any, idx: number) => (
                        <li key={hit.objectID} className={styles.SearchHit}>
                            <Link href={`/blog/${hit.slug}`}>
                                <h3 className={styles.Title}>{hit.title}</h3>
                            </Link>
                        </li>
                    ))}
                </ol>
            )}
        </>
    )
}

export default connectStateResults(Hits)
