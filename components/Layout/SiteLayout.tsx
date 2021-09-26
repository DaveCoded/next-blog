import { useState } from 'react'
import styled from 'styled-components'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'
import ContactModal from '../modals/ContactModal'
import { useRouter } from 'next/router'
import { isBlogPostRoute } from '../../lib/strings'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    const [isContactOpen, setIsContactopen] = useState(false)
    const route = useRouter().route

    return (
        <Container>
            <Navigation setIsContactopen={setIsContactopen} />
            <ContactModal
                isContactOpen={isContactOpen}
                closeContact={() => setIsContactopen(false)}
            />
            <Main route={route}>{children}</Main>
            <SiteFooter />
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`

const Main = styled.main<{ route: string }>`
    background-color: ${(props) =>
        isBlogPostRoute(props.route) ? 'var(--white)' : 'var(--black)'};
    padding: var(--space-xl) var(--space-xl) var(--space-xxl) var(--space-xxxl);

    @media (min-width: 1600px) {
        padding: var(--space-xl) 15vw var(--space-xxl);
    }

    @media (max-width: 700px) {
        padding: var(--space-xl) 5% var(--space-lg);
    }
`

export default SiteLayout
