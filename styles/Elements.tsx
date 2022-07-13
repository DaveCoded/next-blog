import styled from 'styled-components'

export const SuperscriptLabel = styled.span<{ color: string }>`
    color: white;
    font-size: var(--text-xs);
    font-weight: 700;
    vertical-align: super;
    margin-left: var(--space-sm);
    padding: 0 var(--space-xxs);
    border: 2px solid ${({ color }) => color};
    border-radius: 4px;
    background: ${({ color }) => color};
    white-space: nowrap;
`
