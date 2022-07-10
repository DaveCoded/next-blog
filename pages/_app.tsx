import { AppProps } from 'next/app'
import MDXProvider from '../components/mdx/MDXProvider'
import { GlobalStyle } from '../components/GlobalStyle'
import SiteLayout from '../components/Layout/SiteLayout'
import './_app.css'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MDXProvider>
            <GlobalStyle />
            <SiteLayout>
                <Component {...pageProps} />
            </SiteLayout>
        </MDXProvider>
    )
}

export default MyApp
