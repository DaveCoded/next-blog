import styled from 'styled-components'

const Blockquote = styled.blockquote`
    margin: 0 auto var(--space-xl);

    p {
        font-size: var(--text-ml);
        padding: 0 var(--space-lg);
        border-left: 10px solid var(--cool-grey);
        font-weight: 800;
        line-height: 1.4;

        @media (max-width: 600px) {
            font-size: var(--text-md);
            padding: 0 var(--space-md);
        }
    }
`

export default Blockquote
