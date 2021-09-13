import React from 'react'

type Props = { href: string; newTab?: boolean; children: React.ReactNode }

export default function ExternalLink({ href, newTab = false, children }: Props) {
    const props = { href, ...(newTab && { target: '_blank', rel: 'noopener noreferrer' }) }

    return <a {...props}>{children}</a>
}
