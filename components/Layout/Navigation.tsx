import { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import styled, { css } from 'styled-components'

function NavLink({ link }: { link: string }) {
    // todo: also a simple blog post
    const router = useRouter()
    const href = `/${link}`
    const isActive = router.asPath === href

    return (
        <li>
            <Link href={href} passHref>
                <A isActive={isActive}>{link}</A>
            </Link>
        </li>
    )
}

type Props = {
    setIsContactopen: Dispatch<SetStateAction<boolean>>
}

function Navigation({ setIsContactopen }: Props) {
    return (
        <nav>
            <UL>
                <NavLink link="blog" />
                <NavLink link="about" />
                <li>
                    <button onClick={() => setIsContactopen(true)}>contact</button>
                </li>
            </UL>
        </nav>
    )
}

const A = styled.a<{ isActive: boolean }>`
    ${({ isActive }) =>
        isActive &&
        css`
            text-decoration: underline;
            font-weight: 400;
            color: var(--cool-grey);
        `}
    &:hover {
        color: var(--purple);
    }
`

const UL = styled.ul`
    display: flex;
    font-size: 1.5rem;
    color: var(--light-grey);
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
