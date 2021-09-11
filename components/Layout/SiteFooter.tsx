import styled from 'styled-components'
import { GITHUB_LINK, LINKEDIN_LINK, MAILTO_LINK, TWITTER_LINK } from '../../constants/links'

function SiteFooter() {
    return (
        <Footer>
            <UL>
                <LI>
                    <a href={GITHUB_LINK}>Github</a>
                </LI>
                <LI>
                    <a href={LINKEDIN_LINK}>LinkedIn</a>
                </LI>
                <LI>
                    <a href={TWITTER_LINK}>Twitter</a>
                </LI>
                <LI>
                    <a href={MAILTO_LINK}>Email me</a>
                </LI>
            </UL>
            <span>&copy; {new Date().getFullYear()} David Bernhard</span>
        </Footer>
    )
}

const Footer = styled.footer`
    margin-top: auto;
    padding: 0 7rem 3.5rem;
    background-color: var(--black-background);
`

const LI = styled.li`
    list-style: none;

    a {
        text-decoration: underline;
    }
`
const UL = styled.ul`
    display: flex;

    ${LI} + ${LI} {
        margin-left: 1rem;
    }
`

export default SiteFooter
