import Head from 'next/head'
import styled from 'styled-components'
import PageLayout from '../components/Layout/PageLayout'

export default function NotFound() {
    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog</title>
                <meta name="description" content="Page not found!"></meta>
            </Head>

            <PageLayout>
                <h1>404 – Page not found 😬</h1>
            </PageLayout>
        </>
    )
}

const H1 = styled.h1`
    line-height: 0;
`

const Intro = styled.span`
    display: block;
    line-height: 1.2;

    @media (max-width: 600px) {
        font-size: var(--text-lg);
        margin-bottom: var(--space-md);
        line-height: 1.1;
    }
`

const Desc = styled.span`
    font-size: var(--text-lg);
    color: var(--cool-grey);
    line-height: 1.2;

    @media (max-width: 600px) {
        font-size: var(--text-ml);
    }
`

const Bio = styled.p`
    color: var(--light-grey);
    width: min(90%, 60ch);

    @media (max-width: 600px) {
        margin-bottom: var(--space-xl);
    }
`
