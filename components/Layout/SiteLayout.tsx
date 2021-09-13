import { useState } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'
import ContactModal from '../modals/ContactModal'

type Props = {
    route: string
    children: JSX.Element
}

function SiteLayout({ route, children }: Props) {
    const [isContactOpen, setIsContactopen] = useState(false)

    return (
        <Container>
            <GlobalStyle route={route} />
            <Navigation setIsContactopen={setIsContactopen} />
            <ContactModal
                isContactOpen={isContactOpen}
                closeContact={() => setIsContactopen(false)}
            />
            <Main>{children}</Main>
            <SiteFooter />
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;

    @media (max-width: 700px) {
        margin: 0 var(--space-lg);
    }
`

const Main = styled.main`
    padding: var(--space-xxl) var(--space-xxxl) var(--space-xxl);
    @media (min-width: 1600px) {
        padding: var(--space-xxl) 15vw var(--space-xxl);
    }
`

export default SiteLayout
