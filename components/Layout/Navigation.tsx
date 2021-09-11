import { Dispatch, SetStateAction } from 'react'
import Link from 'next/link'
import styled from 'styled-components'

type Props = {
    setIsContactopen: Dispatch<SetStateAction<boolean>>
}

function Navigation({ setIsContactopen }: Props) {
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
                    <button onClick={() => setIsContactopen(true)}>contact</button>
                </li>
            </UL>
        </Nav>
    )
}

const Nav = styled.nav`
    background: var(--black-background);
    padding: 6.25rem 7rem 3rem;

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

        button {
            border: none;
            background: none;
            font-size: inherit;
            font-family: inherit;
            color: inherit;
            cursor: pointer;
            transition: var(--link-hover-transition);

            &:hover {
                color: var(--purple);
            }
        }
    }

    a {
        margin-right: 2rem;
    }
`

export default Navigation
