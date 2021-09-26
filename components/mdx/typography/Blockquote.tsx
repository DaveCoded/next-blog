import styled from 'styled-components'

const Blockquote = styled.blockquote`
    margin: 0 auto var(--space-xl);

    p {
        font-size: var(--text-md);
        font-style: italic;
        padding: 0 var(--space-md);
        border-left: 4px solid var(--dark-grey);
        color: var(--dark-grey);
        line-height: 1.4;

        @media (max-width: 600px) {
            font-size: var(--text-md);
            padding: 0 var(--space-md);
        }
    }
`

export default Blockquote
