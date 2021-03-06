import Link from 'next/link'
import classes from './SiteLayout.module.css'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <nav className={classes.Nav}>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: '1000px',
                        margin: '0 auto',
                        height: '100%'
                    }}
                >
                    <Link href="/">
                        <a
                            style={{
                                fontSize: '3.3rem',
                                lineHeight: 1.5,
                                letterSpacing: 3
                            }}
                        >
                            DB
                        </a>
                    </Link>
                    <ul className={classes.UnorderedList}>
                        <li>
                            <Link href="/">
                                <a>blog</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/about">
                                <a>about</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <main>{children}</main>
        </>
    )
}

export default SiteLayout
