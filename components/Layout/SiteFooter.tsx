import styled from 'styled-components'
import { GITHUB_LINK, LINKEDIN_LINK, MAILTO_LINK, TWITTER_LINK } from '../../constants/links'
import ExternalLink from '../ExternalLink'

function SiteFooter() {
    return (
        <Footer>
            <UL>
                <LI>
                    <ExternalLink href={GITHUB_LINK} newTab>
                        Github
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={LINKEDIN_LINK} newTab>
                        LinkedIn
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={TWITTER_LINK} newTab>
                        Twitter
                    </ExternalLink>
                </LI>
                <LI>
                    <ExternalLink href={MAILTO_LINK} newTab>
                        Email
                    </ExternalLink>
                </LI>
            </UL>
            <Copyright>&copy; {new Date().getFullYear()} David Bernhard</Copyright>
        </Footer>
    )
}

const Footer = styled.footer`
    font-size: var(--text-sm);
    margin-top: auto;
    padding: var(--space-lg) var(--space-xxxl) var(--space-lg);
    background-color: var(--black);
    color: var(--light-grey);

    @media (min-width: 1600px) {
        padding: var(--space-lg) 15vw var(--space-lg);
    }

    @media (max-width: 700px) {
        padding: var(--space-lg) 5% var(--space-lg);
    }
`

const LI = styled.li`
    list-style: none;

    a {
        text-decoration: underline;
    }
`
const UL = styled.ul`
    display: flex;
    font-size: inherit;
    margin-bottom: var(--space-xs);
    ${LI} + ${LI} {
        margin-left: var(--space-md);
    }
`

const Copyright = styled.span`
    color: var(--cool-grey);
`

export default SiteFooter
