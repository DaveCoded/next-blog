import Link from 'next/link'
import styled from 'styled-components'

function Navigation() {
    return (
        <Nav>
            <Link href="/">
                <Logo tabIndex={0}>Dave Bernhard</Logo>
            </Link>
            <Tagline>Web Developer</Tagline>
            <UL>
                <li>
                    <Link href="/blog">
                        <a>blog</a>
                    </Link>
                </li>
                <li>
                    <Link href="/about">
                        <a>about</a>
                    </Link>
                </li>
                <li>
                    <Link href="/projects">
                        <a>projects</a>
                    </Link>
                </li>
                <li>
                    <Link href="/contact">
                        <a>contact</a>
                    </Link>
                </li>
            </UL>
        </Nav>
    )
}

const Nav = styled.nav`
    padding-top: 6.25rem;
    margin-bottom: 6rem;

    @media (max-width: 700px) {
        padding-top: 2.4rem;
    }
`

const Logo = styled.a`
    font-size: 1.4rem;
`

const Tagline = styled.p`
    font-style: italic;
    font-size: 1.4rem;
    margin-top: 0;
    margin-bottom: 2.4rem;
`

const UL = styled.ul`
    padding: 0;
    display: flex;
    font-size: 1.2rem;

    li {
        list-style: none;
    }

    a {
        margin-right: 2rem;
    }

    li:last-child a {
        margin-right: 0;
    }
`

export default Navigation
