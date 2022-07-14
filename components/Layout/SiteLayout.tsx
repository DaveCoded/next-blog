import { useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'
import ContactModal from '../modals/ContactModal'
import MediaConsumption, { MediaContainer } from '../MediaConsumption'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    const [isContactOpen, setIsContactopen] = useState(false)

    return (
        <Container>
            <Header>
                <div>
                    <Link href="/" passHref>
                        <Logo tabIndex={0}>Dave Bernhard</Logo>
                    </Link>
                    <Tagline>Web Developer</Tagline>
                    <Navigation setIsContactopen={setIsContactopen} />
                </div>
                <MediaConsumption />
            </Header>
            <ContactModal
                isContactOpen={isContactOpen}
                closeContact={() => setIsContactopen(false)}
            />
            {children}
            <SiteFooter />
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

const Header = styled.div`
    display: flex;
    padding: var(--space-xl);
    padding-left: var(--space-xxxl);
    justify-content: space-between;

    ${MediaContainer} {
        align-self: flex-start;
        margin-left: var(--space-xxl);
    }

    // Large monitors
    @media (min-width: 1600px) {
        padding: var(--space-xl) 15vw;
    }

    @media (max-width: 850px) {
        display: block;

        ${MediaContainer} {
            margin-top: var(--space-lg);
            width: 100%;
            margin-left: 0;
            padding: 0;
            border: none;
        }
    }

    @media (max-width: 700px) {
        padding: var(--space-xl) 5%;
    }
`

const Logo = styled.a`
    font-size: var(--text-ml);
    line-height: 1;
`

const Tagline = styled.p`
    font-style: italic;
    font-size: var(--text-md);
    line-height: 1.4;
    margin-bottom: var(--space-md);
`

export default SiteLayout
