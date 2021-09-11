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

            <h1>
                Hi. I'm Dave Bernhard,
                <br />
                <Span>a frontend developer working in London.</Span>
            </h1>
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

const Span = styled.span`
    font-size: 1.8rem;
`

const Bio = styled.p`
    color: var(--light-grey);
    font-weight: 300;
    width: min(90%, 700px);
    font-size: 1.2rem;
    line-height: 1.7;

    & .external-link {
        font-weight: 400;
    }
`
