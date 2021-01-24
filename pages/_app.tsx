import { AppProps } from 'next/app'
import '../styles/globals.css'
import MDXProvider from '../components//mdx/MDXProvider'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <MDXProvider>
            <Component {...pageProps} />
        </MDXProvider>
    )
}

export default MyApp
