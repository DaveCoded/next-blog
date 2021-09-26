import React, { CSSProperties } from 'react'

type Props = { href: string; children: React.ReactNode; newTab?: boolean; style?: CSSProperties }

export default function ExternalLink({ href, children, newTab = false, style }: Props) {
    const props = { href, style, ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }) }

    return <a {...props}>{children}</a>
}
