import styled, { css } from 'styled-components'

const linkStyle = css`
    width: max-content;
    position: relative;

    &::before {
        content: '';
        display: block;
        background-image: url(/images/link.svg);
        background-size: 25px 25px;
        background-repeat: no-repeat;
        height: 25px;
        width: 25px;
        position: absolute;
        left: -2rem;
        top: 0.35em; // Use em because not all headings are the same font size
        opacity: 0;
        transition: opacity 0.13s ease-in-out;
    }

    &:hover {
        &::before {
            opacity: 1;
        }
    }
`

export const H2 = styled.h2`
    font-family: 'Headline', serif;
    color: var(--light-black);
    font-size: var(--text-lg);
    line-height: 1.2;
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);

    ${linkStyle}
`

export const H3 = styled.h3`
    color: var(--light-black);
    font-size: var(--text-ml);
    margin-top: var(--space-xl);
    margin-bottom: var(--space-sm);

    ${H2} + & {
        margin-top: 0;
    }

    ${linkStyle}
`

export const H4 = styled.h4`
    color: var(--light-black);
    font-size: var(--text-md);
    font-weight: 600;
    margin-top: var(--space-md);
    margin-bottom: var(--space-xs);

    ${linkStyle}
`

export const H5 = styled.h5`
    color: var(--light-black);
    font-size: var(--text-body);
    margin-top: var(--space-md);
    margin-bottom: var(--space-xs);

    ${linkStyle}
`
