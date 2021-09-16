import styled from 'styled-components'
import ExternalLink from '../ExternalLink'
import { Article, H3 } from './LatestPosts'

export default function ProjectsList() {
    return (
        <Project>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/PUYL.svg" alt="Abstract broken circle shape" width={60} height={60} />
            <ExternalLink href="https://promptupyour.life" newTab>
                <Heading>Prompt up your life</Heading>
            </ExternalLink>
            <P>A random prompt generator for practising UI design/development and illustration</P>
            <TechContainer>
                <Tech>Tech used:</Tech>
                <UL>
                    <LI>Svelte</LI>,<LI>TypeScript</LI>
                </UL>
            </TechContainer>
        </Project>
    )
}

// todo: write a blog article about this CSS grid trick (defining a row height shorter than image)
const Project = styled(Article)`
    display: grid;
    grid-template-columns: min-content minmax(min-content, 45ch);
    grid-template-rows: var(--space-lg) 1fr;
    grid-column-gap: var(--space-lg);

    @media (max-width: 500px) {
        grid-template-rows: auto;
    }
`

const Heading = styled(H3)`
    @media (max-width: 500px) {
        align-self: center;
    }
`

const P = styled.p`
    margin: var(--space-xs) 0;
    color: var(--light-grey);
    grid-column: 2;

    @media (max-width: 500px) {
        grid-column: 1 / 3;
    }
`

const LI = styled.li`
    list-style: none;
    margin-left: var(--space-sm);
`

const UL = styled.ul`
    display: inline-flex;
    margin: 0;
`

const Tech = styled.p`
    font-size: var(--text-sm);
    line-height: 1;
`

const TechContainer = styled.div`
    color: var(--cool-grey);
    font-size: var(--text-sm);
    display: flex;
    align-items: center;
    grid-column: 2;

    @media (max-width: 500px) {
        grid-column: 1 / 3;
    }
`
