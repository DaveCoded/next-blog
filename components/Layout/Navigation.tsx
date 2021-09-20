import { CSSProperties, Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

function NavLink({ link }: { link: string }) {
    // todo: also a simple blog post
    const router = useRouter()
    const href = `/${link}`

    const style: CSSProperties = {
        ...(router.asPath === href && {
            textDecoration: 'underline',
            fontWeight: 600,
            color: 'var(--teal)'
        })
    }

    return (
        <li>
            <Link href={href}>
                <a style={style}>{link}</a>
            </Link>
        </li>
    )
}

type Props = {
    setIsContactopen: Dispatch<SetStateAction<boolean>>
}

function Navigation({ setIsContactopen }: Props) {
    return (
        <Nav>
            <Link href="/" passHref>
                <Logo tabIndex={0}>Dave Bernhard</Logo>
            </Link>
            <Tagline>Web Developer</Tagline>
            <UL>
                <NavLink link="blog" />
                <NavLink link="about" />
                {/* <NavLink link="projects" /> */}
                <li>
                    <button onClick={() => setIsContactopen(true)}>contact</button>
                </li>
            </UL>
        </Nav>
    )
}

const Nav = styled.nav`
    background: var(--black);
    padding: var(--space-xxxl) var(--space-xxxl) var(--space-xxl);

    @media (min-width: 1600px) {
        padding: var(--space-xxl) 15vw var(--space-xxl);
    }

    @media (max-width: 700px) {
        padding: var(--space-xl) 5% var(--space-xl);
    }
`

const Logo = styled.a`
    font-size: var(--text-ml);
    line-height: 1;
`

const Tagline = styled.p`
    font-style: italic;
    font-size: var(--text-ml);
    line-height: 1.4;
    margin-bottom: var(--space-lg);
`

const UL = styled.ul`
    display: flex;
    font-size: var(--text-md);
    font-weight: 300;
    line-height: 1;
    li {
        list-style: none;

        button {
            line-height: 1;
            border: none;
            background: none;
            font-size: inherit;
            font-weight: inherit;
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
        margin-right: var(--space-lg);

        @media (max-width: 400px) {
            margin-right: var(--space-md);
        }
    }
`

export default Navigation
