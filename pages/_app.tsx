import { AppProps } from 'next/app'
import '../styles/globals.css'
import MDXProvider from '../components//mdx/MDXProvider'
import SiteLayout from '../components/SiteLayout'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MDXProvider>
            <SiteLayout>
                <Component {...pageProps} />
            </SiteLayout>
        </MDXProvider>
    )
}

export default MyApp
