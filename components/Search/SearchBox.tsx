import { motion } from 'framer-motion'
import { connectSearchBox } from 'react-instantsearch-dom'
import styled from 'styled-components'

function SearchBox({ refine }: any) {
    return (
        <form action="" role="search">
            <label htmlFor="algolia_search" hidden>
                Search posts
            </label>
            <Input
                as={motion.input}
                id="algolia_search"
                type="search"
                placeholder="search posts"
                onChange={(e: any) => refine(e.currentTarget.value)}
                whileFocus={{ width: '100%' }}
            />
        </form>
    )
}

const Input = styled.input`
    border: 2px solid var(--black);
    font-family: 'Ubuntu Mono';
    font-size: 1.2rem;
    background-color: hsl(0deg 0% 100% / 55%);
    padding: 7px 14px;

    &:focus {
        outline: none;
    }

    &::-webkit-search-cancel-button {
        display: none;
    }
`

export default connectSearchBox(SearchBox)
