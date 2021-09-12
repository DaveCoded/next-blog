import { useState } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'
import ContactModal from '../modals/ContactModal'
import { isBlogPostRoute } from '../../lib/strings'

type Props = {
    route: string
    children: JSX.Element
}

function SiteLayout({ route, children }: Props) {
    console.log('route', route)
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
        margin: 0 3rem;
    }
`

const Main = styled.main`
    padding: 6rem 7rem 0;
`

export default SiteLayout
