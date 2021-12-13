import { useState } from 'react'
import Head from 'next/head'
import styled from 'styled-components'
import PageLayout from '../components/Layout/PageLayout'
import BioControls from '../components/bio/BioControls'
import Neutral from '../components/bio/Neutral'

const BIO_TONES = ['bitter', 'snobby', 'neutral', 'melancholic', 'self-deprecating'] as const
type BioTuple = typeof BIO_TONES
export type BioTone = BioTuple[number]

export default function Home() {
    const [activeBio, setActiveBio] = useState<BioTone>('neutral')

    return (
        <>
            <Head>
                <title>Dave Bernhard&apos;s blog</title>
                <meta
                    name="description"
                    content="About Dave. Some more information about the website author and his proclivities."
                ></meta>
            </Head>

            <PageLayout>
                <H1>About</H1>
                <ControlsWrapper>
                    <BioControls
                        bios={BIO_TONES}
                        activeBio={activeBio}
                        setActiveBio={setActiveBio}
                    />
                </ControlsWrapper>
                <Bio>
                    <Neutral />
                </Bio>
            </PageLayout>
        </>
    )
}

const H1 = styled.h1`
    @media (max-width: 600px) {
        font-size: var(--text-xl);
        margin-bottom: var(--space-md);
    }
`

const Bio = styled.div`
    width: min(90%, 650px);
    color: var(--cool-grey);
    @media (max-width: 600px) {
        margin-bottom: var(--space-xl);
    }
`

const ControlsWrapper = styled.div`
    overflow: scroll;
    margin-bottom: var(--space-md);
`
