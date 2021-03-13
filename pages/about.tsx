import Head from 'next/head'
import classes from './about.module.css'

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

            <div className={classes.AboutMain}>
                <div className={classes.Container}>
                    <h1 className={classes.Heading}>
                        Hi. I'm Dave Bernhard, a frontend developer working in London.
                    </h1>
                    <p className={classes.AboutDave}>
                        This is my blog. It's a space for me to write about what I'm learning in
                        tech; hopefully you'll learn something interesting here. If you do, or if
                        you have any suggestions for improvements to my articles, please reach out
                        on Twitter. I'm{' '}
                        <a
                            href="https://twitter.com/daveforall"
                            target="_blank"
                            rel="noreferrer"
                            className={`${classes.Link} external-link`}
                        >
                            @daveforall
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
