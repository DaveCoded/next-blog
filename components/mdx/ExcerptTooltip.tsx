import { ReactNode } from 'react'
import Tooltip from './Tooltip'

type Props = {
    excerpt: any
    children: ReactNode
}

export default function ExcerptTooltip({ excerpt, children }: Props) {
    return <Tooltip content={excerpt}>{children}</Tooltip>
}
