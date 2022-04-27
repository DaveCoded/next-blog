import Head from 'next/head'
import styled from 'styled-components'
import ExternalLink from '../components/ExternalLink'
import PageLayout from '../components/Layout/PageLayout'

export default function Home() {
    return (
        <>
            <Head>
                <title>Dave Bernhard's blog</title>
                <meta
                    name="description"
                    content="About Dave. Some more information about the website author and his proclivities."
                ></meta>
            </Head>

            <PageLayout>
                <H1>About</H1>
                <Bio>
                    <p>
                        I'm a Frontend Developer with polyglot ambitions. I currently work at Feed,
                        a creative agency in London. In my day-to-day, I build complex interactive
                        interfaces with React, TypeScript and MobX. And also design Node APIs, using
                        MySQL for a DBMS.
                    </p>
                    <p>
                        In a former life, I was in book publishing. I still spend a lot of my spare
                        time reading, both for pleasure and to learn new things (which is also a
                        pleasure).
                    </p>
                    <p>
                        My more unusual experiences include climbing Mount Stanley in Uganda and
                        playing a Victorian policeman in an interactive murder mystery at the
                        Edinburgh Fringe. I'll still answer to Constable Crowley.
                    </p>{' '}
                    <p>
                        Music has always been very important to me. I have sung Mozart's Requiem
                        Mass and been to see NOFX live on five occasions. They were, respectively,
                        average, brilliant, disinterested, very drunk, and then brilliant again. I'm
                        currently trying to learn{' '}
                        <ExternalLink
                            href="https://www.youtube.com/watch?v=L42sbnQxEmw&ab_channel=Rousseau"
                            newTab
                            style={{ color: 'var(--link-pink)' }}
                        >
                            Un Sospiro
                        </ExternalLink>{' '}
                        by Liszt on the piano; wish me luck!
                    </p>
                </Bio>
            </PageLayout>
        </>
    )
}

const H1 = styled.h1`
    @media (max-width: 600px) {
        font-size: var(--text-xl);
        margin-bottom: var(--space-md);
        line-height: 1.1;
    }
`

const Bio = styled.div`
    width: min(90%, 650px);
    color: var(--cool-grey);
    @media (max-width: 600px) {
        margin-bottom: var(--space-xl);
    }
`
