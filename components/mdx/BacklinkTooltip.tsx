import { ReactNode } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import styled from 'styled-components'

type Props = {
    content: ReactNode
    children: ReactNode
}

export default function BacklinkTooltip({ content, children }: Props) {
    return (
        <StyledTippy content={content}>
            <span>{children}</span>
        </StyledTippy>
    )
}

const StyledTippy = styled(Tippy)`
    --tooltip-color: #161932;
    background-color: var(--tooltip-color);
    max-width: 380px !important;

    .tippy-content {
        padding: var(--space-sm) var(--space-md);
    }

    .tippy-arrow {
        color: var(--tooltip-color);
    }
`
