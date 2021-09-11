import styled from 'styled-components'

function SiteFooter() {
    return (
        <Footer>
            <UL>
                <LI>
                    <a href="">Github</a>
                </LI>
                <LI>
                    <a href="">LinkedIn</a>
                </LI>
                <LI>
                    <a href="">Twitter</a>
                </LI>
                <LI>
                    <a href="">Email me</a>
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
