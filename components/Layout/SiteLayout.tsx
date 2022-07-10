import { useState } from 'react'
import styled from 'styled-components'
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
            <Navigation setIsContactopen={setIsContactopen} />
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

export default SiteLayout
