import classes from './SiteLayout.module.css'

type Props = {
    children: JSX.Element
}

function SiteLayout({ children }: Props) {
    return (
        <>
            <nav className={classes.Nav}>
                <ul className={classes.UnorderedList}>
                    <li>home</li>
                    <li>about</li>
                    <li>blog</li>
                </ul>
            </nav>
            <main>{children}</main>
        </>
    )
}

export default SiteLayout
