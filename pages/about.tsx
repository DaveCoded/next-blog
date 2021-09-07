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

            <OuterContainer>
                <InnerContainer>
                    <H1>Hi. I'm Dave Bernhard, a frontend developer working in London.</H1>
                    <Bio>
                        This is my blog. It's a space for me to write about what I'm learning in
                        tech; hopefully you'll learn something interesting here. If you do, or if
                        you have any suggestions for improvements to my articles, please reach out
                        on Twitter. I'm{' '}
                        <a
                            href="https://twitter.com/daveforall"
                            target="_blank"
                            rel="noreferrer"
                            className="external-link"
                        >
                            @daveforall
                        </a>
                    </Bio>
                </InnerContainer>
            </OuterContainer>
        </>
    )
}

// todo: rename containers
const OuterContainer = styled.div`
    width: min(90%, 900px);
    margin: 0 auto;
`

const InnerContainer = styled.div`
    height: calc(100vh - var(--nav-height));
    padding-bottom: var(--nav-height);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`

const H1 = styled.h1`
    text-align: center;
    font-size: 3.8rem;
`

const Bio = styled.p`
    font-weight: 200;
    width: min(90%, 700px);
    font-size: 1.4rem;
    line-height: 1.7;

    @media (max-width: 560px) {
        font-size: 1.3rem;
    }
`
