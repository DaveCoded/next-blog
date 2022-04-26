import { AppProps } from 'next/app'
import MDXProvider from '../components/mdx/MDXProvider'
import { GlobalStyle } from '../components/GlobalStyle'
import SiteLayout from '../components/Layout/SiteLayout'
import './_app.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
    const route = useRouter().route

    return (
        <MDXProvider>
            <GlobalStyle />
            <SiteLayout>
                <Component {...pageProps} key={route} />
            </SiteLayout>
        </MDXProvider>
    )
}

export default MyApp
