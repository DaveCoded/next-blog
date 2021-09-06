import Link from 'next/link'
import { GlobalStyle } from './GlobalStyle'
import styles from './SiteLayout.module.css'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <GlobalStyle />
            <nav className={styles.Nav}>
                <div className={styles.NavContainer}>
                    <Link href="/">
                        <a className={styles.Logo}>DB</a>
                    </Link>
                    <ul className={styles.UnorderedList}>
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
