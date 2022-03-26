import Head from 'next/head'
import PageLayout from '../components/Layout/PageLayout'

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta name="description" content="Page not found!"></meta>
            </Head>

            <PageLayout>
                <h1>404 – Page not found 😬</h1>
            </PageLayout>
        </>
    )
}
