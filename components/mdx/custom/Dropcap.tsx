import styled from 'styled-components'
import { P } from '../typography'

interface Props {
    children: string
}

const Dropcap = ({ children }: Props) => {
    const firstLetter = children[0]
    const remainder = children.slice(1)

    return (
        <P>
            <span aria-hidden="true">
                <Illuminated>{firstLetter}</Illuminated>
            </span>
            {remainder}
            <SROnly>{children}</SROnly>
        </P>
    )
}

const Illuminated = styled.span`
    border-radius: 4px;
    float: left;
    font-size: 6.8rem;
    font-weight: 600;
    line-height: 1;
    margin: 0 0.5rem 0 0;
    padding: 1.6rem 0.7rem 0 0;
    text-shadow: 4px 4px #d894a0;

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
