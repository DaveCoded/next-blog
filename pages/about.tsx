import Head from 'next/head'

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

            <main
                style={{
                    height: '100vh',
                    maxWidth: '900px',
                    margin: '0 auto'
                }}
            >
                <div
                    style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <h1
                        style={{
                            textAlign: 'center',
                            marginTop: '-35%',
                            fontSize: '4rem',
                            lineHeight: 1.2,
                            fontFamily: 'Playfair Display'
                        }}
                    >
                        Hi. I'm Dave Bernhard, a frontend developer working in London.
                    </h1>
                    <p
                        style={{
                            maxWidth: '700px',
                            fontSize: '1.6rem',
                            lineHeight: 1.7
                        }}
                    >
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
                    </p>
                </div>
            </main>
        </>
    )
}
