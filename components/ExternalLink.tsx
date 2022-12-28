import React, { AnchorHTMLAttributes } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { newTab?: boolean }

export default function ExternalLink({ href, children, newTab = false, style, ...rest }: Props) {
    const props = {
        href,
        style,
        ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }),
        ...rest
    }

    return <a {...props}>{children}</a>
}
