import Link from 'next/link'
import classes from './SiteLayout.module.css'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <nav className={classes.Nav}>
                <div className={classes.NavContainer}>
                    <Link href="/">
                        <a
                            style={{
                                fontSize: '3.9rem',
                                marginTop: '3px'
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
