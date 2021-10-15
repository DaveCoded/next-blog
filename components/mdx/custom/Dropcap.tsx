import React from 'react'
import styled from 'styled-components'

interface Props {
    children: string | any[]
}

/**
 * Wraps the first word
 */
const Dropcap = ({ children }: Props) => {
    const isChildrenString = typeof children === 'string'
    const firstLetter = isChildrenString ? children[0] : children[0][0]
    const remainder = isChildrenString
        ? children.slice(1)
        : [children[0].slice(1), ...children.slice(1)]

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
    margin: 0 0.5rem 0 0;
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

/* https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
const SROnly = styled.span`
    &:not(:focus):not(:active) {
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }
`

export default Dropcap
