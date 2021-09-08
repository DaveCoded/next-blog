import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'
import SiteFooter from './SiteFooter'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <Container>
            <GlobalStyle />
            <Navigation />
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
`

export default SiteLayout
