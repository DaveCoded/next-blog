import styled from 'styled-components'
import { GlobalStyle } from '../GlobalStyle'
import Navigation from './Navigation'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <GlobalStyle />
            <Navigation />
            <main>{children}</main>
        </>
    )
}

export default SiteLayout
