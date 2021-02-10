import Link from 'next/link'
import classes from './SiteLayout.module.css'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <nav className={classes.Nav}>
                <ul className={classes.UnorderedList}>
                    <Link href="/">
                        <a>home</a>
                    </Link>
                    <Link href="/blog">
                        <a>blog</a>
                    </Link>
                    <Link href="/about">
                        <a>about</a>
                    </Link>
                </ul>
            </nav>
            <main>{children}</main>
        </>
    )
}

export default SiteLayout
