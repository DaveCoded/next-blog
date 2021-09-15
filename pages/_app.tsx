import { AppProps } from 'next/app'
import { motion } from 'framer-motion'
import MDXProvider from '../components/mdx/MDXProvider'
import { GlobalStyle } from '../components/GlobalStyle'
import SiteLayout from '../components/Layout/SiteLayout'

function MyApp({ Component, pageProps, router }: AppProps) {
    return (
        <MDXProvider>
            <GlobalStyle />
            <SiteLayout>
                <motion.div
                    key={router.route}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <Component {...pageProps} key={router.route} />
                </motion.div>
            </SiteLayout>
        </MDXProvider>
    )
}

export default MyApp
