import React, { AnchorHTMLAttributes } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { newTab?: boolean }

export default function ExternalLink({ href, children, newTab = false, style }: Props) {
    const props = { href, style, ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }) }

    return <a {...props}>{children}</a>
}
