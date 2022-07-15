import React from 'react'
import styled from 'styled-components'
import { SROnly } from '@/styles/accessibility'

interface Props {
    children: string
}

/**
 * Wraps the first word
 */
const Dropcap = ({ children }: Props) => {
    const firstLetter = children[0]
    const remainder = children.slice(1)

    return (
        <>
            <span aria-hidden="true">
                <Illuminated>{firstLetter}</Illuminated>
                {remainder}
            </span>
            <SROnly>{children}</SROnly>
        </>
    )
}

const Illuminated = styled.span`
    font-family: 'Headline';
    font-weight: 700;
    color: var(--light-black);
    float: left;
    font-size: 7.4rem;
    line-height: 1;
    margin: 0 0.5rem 0.1rem 0;
    padding: 0.8rem 0.2rem 0 0;

    &:before,
    &:after {
        content: '';
        display: block;
    }

    &:before {
        margin-top: -0.2em;
    }

    &:after {
        margin-bottom: -0.15em;
    }
`

export default Dropcap
