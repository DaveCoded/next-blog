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
    background-color: hsl(219deg 45% 21%);
    color: rgb(238 238 238);
    font-weight: 600;
    padding: 0.7rem 1.5rem;
    border-radius: 10px 10px 0 0;
    margin-top: 1.2rem;
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
    background-color: hsl(222deg 52% 13%);
    border: 2px solid #4a6696;
    color: white;
    cursor: pointer;
    transition: all 0.4s;
`

export default CodeBlock
