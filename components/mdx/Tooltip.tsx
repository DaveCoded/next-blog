import { ReactNode } from 'react'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

type Props = {
    content: ReactNode
    children: ReactNode
}

export default function Tooltip({ content, children }: Props) {
    return (
        <Tippy content={content}>
            <span>{children}</span>
        </Tippy>
    )
}
