import styled from 'styled-components'

export const H2 = styled.h2`
    font-family: 'Headline', serif;
    color: var(--light-black);
    font-size: var(--text-lg);
    line-height: 1.2;
    margin-top: var(--space-xl);
    margin-bottom: var(--space-md);
`

export const H3 = styled.h3`
    color: var(--light-black);
    font-size: var(--text-ml);
    margin-top: var(--space-xl);
    margin-bottom: var(--space-sm);

    ${H2} + & {
        margin-top: 0;
    }
`

export const H4 = styled.h4`
    color: var(--light-black);
    font-size: var(--text-md);
    font-weight: 600;
    margin-top: var(--space-md);
    margin-bottom: var(--space-xs);
`

export const H5 = styled.h5`
    color: var(--light-black);
    font-size: var(--text-body);
    margin-top: var(--space-md);
    margin-bottom: var(--space-xs);
`
