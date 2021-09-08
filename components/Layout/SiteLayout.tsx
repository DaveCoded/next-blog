import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <Container>
            <GlobalStyle />
            <Navigation />
            <main>{children}</main>
        </Container>
    )
}

const Container = styled.div`
    margin: 0 7rem;
`

export default SiteLayout
