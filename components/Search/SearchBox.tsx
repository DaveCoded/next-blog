import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'

function SearchBox({ refine }: any) {
    return (
        <form action="" role="search">
            <label htmlFor="algolia_search" hidden>
                Search posts
            </label>
            <Input
                id="algolia_search"
                type="search"
                placeholder="search posts"
                onChange={(e: any) => refine(e.currentTarget.value)}
            />
        </form>
    )
}

const Input = styled.input`
    border: none;
    font-size: 1.1rem;
    background-color: var(--light-grey);
    padding: 7px 14px;
    width: 21rem;

    &:focus {
        outline: none;
    }

    &::-webkit-search-cancel-button {
        display: none;
    }

    &::placeholder {
        color: var(--dark-grey);
    }
`

export default connectSearchBox(SearchBox)
