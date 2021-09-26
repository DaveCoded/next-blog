import { AppProps } from 'next/app'
import MDXProvider from '../components/mdx/MDXProvider'
import { GlobalStyle } from '../components/GlobalStyle'
import SiteLayout from '../components/Layout/SiteLayout'
import { AnimatePresence } from 'framer-motion'
import './_app.css'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
    const route = useRouter().route

    return (
        <MDXProvider>
            <GlobalStyle />
            <SiteLayout>
                <AnimatePresence
                    exitBeforeEnter
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    <Component {...pageProps} key={route} />
                </AnimatePresence>
            </SiteLayout>
        </MDXProvider>
    )
}

export default MyApp
