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
            <GlobalStyle />
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

    @media (max-width: 700px) {
        margin: 0 3rem;
    }
`

type MainProps = {
    route: string
}

// todo: write a blog post on this
const Main = styled.main<MainProps>`
    background-color: ${(props) =>
        isBlogPostRoute(props.route) ? 'white' : 'var(--black-background)'};
    padding: 6rem 7rem 0;
`

export default SiteLayout
