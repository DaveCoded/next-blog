import { useRef } from 'react'
import styled from 'styled-components'
import { copyCodeToClipboard } from '../../../lib/copyCodeToClipboard'

const CodeBlock = (props: any) => {
    const codeRef = useRef<HTMLPreElement>(null)
    const title = props.children.props.title

    return (
        <>
            <TitleContainer>
                {title ? <span>{title}</span> : null}
                <span style={{ marginLeft: 'auto' }}>
                    <CopyButton onClick={() => copyCodeToClipboard(codeRef)}>Copy</CopyButton>
                </span>
            </TitleContainer>
            <pre {...props} ref={codeRef}>
                {props.children}
            </pre>
        </>
    )
}

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: var(--light-black);
    color: var(--light-grey);
    font-weight: 600;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 6px 6px 0 0;
    margin-top: var(--space-lg);
    font-family: 'Ubuntu Mono';
    font-size: 1.1rem;
    letter-spacing: 0.4px;
`

const CopyButton = styled.button`
    border: 0;
    margin: 0;
    padding: 0.25rem 0.6rem;
    line-height: 1.2;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 800;
    letter-spacing: 0.6px;
    border-radius: 4px;
    background-color: var(--black);
    border: 2px solid var(--cool-grey);
    color: var(--light-grey);
    cursor: pointer;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--white);
        background-color: var(--light-black);
    }
`

export default CodeBlock
