import { HTMLAttributes, ReactElement, useRef, useState } from 'react'
import styled from 'styled-components'
import { copyCodeToClipboard } from '@/lib/copyCodeToClipboard'

const CodeBlock = (props: HTMLAttributes<HTMLPreElement>) => {
    const [isCopied, setIsCopied] = useState(false)
    const codeRef = useRef<HTMLPreElement>(null)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const title = (props.children as ReactElement).props.title

    const handleClick = async () => {
        await copyCodeToClipboard(codeRef)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 1500)
    }

    return (
        <>
            <TitleContainer>
                {title ? <span>{title}</span> : null}
                <ButtonContainer>
                    <CopyButton onClick={handleClick} isCopied={isCopied}>
                        {isCopied ? 'Copied!' : 'Copy'}
                    </CopyButton>
                </ButtonContainer>
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
    font-weight: 700;
    padding: var(--space-sm) var(--space-lg);
    border-radius: 6px 6px 0 0;
    margin-top: var(--space-lg);
    font-family: var(--code-font-family);
    font-size: 1.1rem;
    letter-spacing: 0.4px;
`

const ButtonContainer = styled.span`
    margin-left: auto;
`

const CopyButton = styled.button<{ isCopied: boolean }>`
    border: 0;
    margin: 0;
    padding: 0.25rem 0.6rem;
    line-height: 1.2;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.6px;
    border-radius: 4px;
    background-color: ${(props) => (props.isCopied ? '#085e06' : 'var(--black)')};
    border: 2px solid var(--cool-grey);
    color: var(--light-grey);
    cursor: pointer;
    transition: var(--link-hover-transition);

    &:hover {
        color: var(--white);
        background-color: ${(props) => (props.isCopied ? '#085e06' : 'var(--light-black)')};
    }
`

export default CodeBlock
