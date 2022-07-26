import Link from 'next/link'
import { ReactNode } from 'react'
import styled from 'styled-components'

type Props = {
    href: string
    children: ReactNode
}

export default function InternalLink({ href, children }: Props) {
    return (
        <Link href={href} passHref>
            <A>{children}</A>
        </Link>
    )
}

const A = styled.a`
    color: var(--link-pink);

    &:hover {
        color: var(--link-pink);
    }
`
