import { AppProps } from 'next/app'
import { GlobalStyle } from '../styles/GlobalStyle'
import SiteLayout from '../components/Layout/SiteLayout'
import './_app.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <SiteLayout>
                <Component {...pageProps} />
            </SiteLayout>
        </>
    )
}

export default MyApp
