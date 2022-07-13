import { useRouter } from 'next/router'
import styled from 'styled-components'

type Props = {
    headings: { text: string; level: number }[]
}

type StyleProps = {
    level: number
}

function TableOfContents({ headings }: Props) {
    const route = useRouter().asPath
    return (
        <Wrapper>
            <Summary>Table of contents</Summary>
            {headings.map(({ text, level }) => {
                const link = text
                    .toLowerCase()
                    .replaceAll(' ', '-')
                    .replace(/[.,?()']/gim, '')
                const href = `${route}#${link}`

                return (
                    // todo: add new <ol> for each new nested level?
                    <A key={text} href={href} level={level}>
                        {text}
                    </A>
                )
            })}
        </Wrapper>
    )
}

const Wrapper = styled.details`
    margin-top: var(--space-xl);
    margin-bottom: var(--space-lg);
`

const Summary = styled.summary`
    font-size: var(--text-sm);
    margin-bottom: var(--space-sm);
`

const A = styled.a<StyleProps>`
    display: block;
    position: relative;
    margin-left: ${(props) => (props.level === 2 ? 0 : `${(props.level - 2) * 32}px`)};
    font-size: var(--text-sm);
    margin-bottom: var(--space-xs);
`

export default TableOfContents
