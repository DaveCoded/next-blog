import Link from 'next/link'
import styled from 'styled-components'

function Navigation() {
    return (
        <Nav>
            <Container>
                <Link href="/">
                    <Logo>DB</Logo>
                </Link>
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
                </UL>
            </Container>
        </Nav>
    )
}

const Nav = styled.nav`
    height: var(--nav-height);
    margin-bottom: 24px;
`

const Container = styled.div`
    width: min(90%, 1000px);
    display: flex;
    align-items: center;
    margin: 0 auto;
    height: 100%;
`

const Logo = styled.a`
    font-size: 3.9rem;
    font-weight: 700;
    height: 100%;
    line-height: 1.5;
    cursor: pointer;
`

const UL = styled.ul`
    margin-left: auto;
    padding: 0;
    display: flex;

    li {
        list-style: none;
    }

    a {
        list-style: none;
        font-size: 1.8rem;
        margin-right: 2rem;
    }

    li:last-child a {
        margin-right: 0;
    }
`

export default Navigation
