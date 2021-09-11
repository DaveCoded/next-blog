import { useState } from 'react'
import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'
import ContactModal from '../modals/ContactModal'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    const [isContactOpen, setIsContactopen] = useState(false)

    return (
        <Container>
            <GlobalStyle />
            <Navigation setIsContactopen={setIsContactopen} />
            <ContactModal
                isContactOpen={isContactOpen}
                closeContact={() => setIsContactopen(false)}
            />
            <main>{children}</main>
            <SiteFooter />
        </Container>
    )
}

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 7rem;

    @media (max-width: 700px) {
        margin: 0 3rem;
    }
`

export default SiteLayout
