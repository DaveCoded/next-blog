import Head from 'next/head'
import styled from 'styled-components'

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

            <H1>
                <Intro>Hi. I'm Dave Bernhard,</Intro>
                <br />
                <Desc>a frontend developer working in London.</Desc>
            </H1>
            <Bio>
                This is my blog. It's a space for me to write about what I'm learning in tech;
                hopefully you'll learn something interesting here. If you do, or if you have any
                suggestions for improvements to my articles, please reach out on Twitter. I'm{' '}
                <a
                    href="https://twitter.com/daveforall"
                    target="_blank"
                    rel="noreferrer"
                    className="external-link"
                >
                    @daveforall
                </a>
            </Bio>
        </>
    )
}

// ! DO THIS IN MEDIA QUERIES!!
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
