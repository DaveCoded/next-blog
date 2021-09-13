import { FormEvent } from 'react'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'

function SearchBox({ refine }: any) {
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return
    }

    return (
        <form action="" role="search" onSubmit={handleSubmit}>
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
    font-size: var(--text-body);
    background-color: var(--light-black);
    border: 2px solid var(--light-black);
    color: var(--off-white);
    border-radius: 4px;
    padding: var(--space-xs) var(--space-sm);
    width: 21rem;

    &:focus {
        outline: none;
        border-color: var(--purple);
    }

    &::-webkit-search-cancel-button {
        display: none;
    }

    &::placeholder {
        color: var(--light-grey);
        font-size: var(--text-sm);
    }
`

export default connectSearchBox(SearchBox)
