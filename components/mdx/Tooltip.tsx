import { ReactNode } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styled from 'styled-components'

type Props = {
    content: ReactNode
    children: ReactNode
}

export default function Tooltip({ content, children }: Props) {
    return (
        <StyledTippy content={content}>
            <span>{children}</span>
        </StyledTippy>
    )
}

const StyledTippy = styled(Tippy)`
    .tippy-content {
        padding: var(--space-xs) var(--space-sm);
        padding-top: var(--space-xxs);
    }
`
