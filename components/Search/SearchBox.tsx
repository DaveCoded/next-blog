import { connectSearchBox } from 'react-instantsearch-dom'

function SearchBox({ refine }: any) {
    return (
        <form action="" role="search">
            <label htmlFor="algolia_search">Search articles</label>
            <input
                id="algolia_search"
                type="search"
                placeholder="javascript tutorial"
                onChange={(e) => refine(e.currentTarget.value)}
            />
        </form>
    )
}

export default connectSearchBox(SearchBox)
