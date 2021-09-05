import { motion } from 'framer-motion'
import { connectSearchBox } from 'react-instantsearch-dom'
import styles from './SearchBox.module.css'

function SearchBox({ refine }: any) {
    return (
        <form action="" role="search">
            <label htmlFor="algolia_search" hidden>
                Search posts
            </label>
            <motion.input
                id="algolia_search"
                className={styles.SearchBox}
                type="search"
                placeholder="search posts"
                onChange={(e) => refine(e.currentTarget.value)}
                whileFocus={{ width: '100%' }}
            />
        </form>
    )
}

export default connectSearchBox(SearchBox)
