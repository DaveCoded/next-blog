import styled from 'styled-components'

/* https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html */
export const SROnly = styled.span`
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
