import styled from 'styled-components'
import ExternalLink from '../ExternalLink'
import { Article, H3 } from './LatestPosts'

export default function ProjectsList() {
    const PUYL_LINK = 'https://prompt.davebernhard.com/'
    const LODASH_CODEMOD_LINK = 'https://github.com/DaveCoded/lodash-imports-codemod'

    return (
        <div>
            <Project>
                <a href={PUYL_LINK} target="_blank" rel="noreferrer noopener">
                    <img
                        src="/images/PUYL.svg"
                        alt="Abstract broken circle shape"
                        width={60}
                        height={60}
                    />
                </a>
                <div>
                    <ExternalLink href={PUYL_LINK} newTab>
                        <Heading>Prompt up your life</Heading>
                    </ExternalLink>
                    <P>
                        A random prompt generator for practising UI design/development and
                        illustration
                    </P>
                    <TechContainer>
                        <Tech>Tech used:</Tech>
                        <UL>
                            <LI>Svelte</LI>,<LI>TypeScript</LI>
                        </UL>
                    </TechContainer>
                </div>
            </Project>
            <Project>
                <a href={LODASH_CODEMOD_LINK} target="_blank" rel="noreferrer noopener">
                    <img src="/images/github-mark.svg" alt="Github logo" width={60} height={60} />
                </a>
                <div>
                    <ExternalLink href={LODASH_CODEMOD_LINK} newTab>
                        <Heading>Lodash imports codemod</Heading>
                    </ExternalLink>
                    <P>A codemod for converting to single method imports from lodash</P>
                    <TechContainer>
                        <Tech>Tech used:</Tech>
                        <UL>
                            <LI>jscodeshift</LI>
                        </UL>
                    </TechContainer>
                </div>
            </Project>
        </div>
    )
}

// todo: write a blog article about this CSS grid trick (defining a row height shorter than image)
const Project = styled(Article)`
    display: flex;
    gap: var(--space-lg);
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
    font-weight: 300;
    line-height: 1.4;

    @media (max-width: 500px) {
        grid-column: 1 / 3;
    }
`

const LI = styled.li`
    list-style: none;
    font-size: var(--text-sm);
    margin-left: var(--space-sm);
`

const UL = styled.ul`
    display: inline-flex;
    align-items: baseline;
    margin: 0;
    line-height: 1;
`

const Tech = styled.p`
    font-size: var(--text-sm);
    line-height: 1;
    white-space: nowrap;
`

const TechContainer = styled.div`
    color: var(--cool-grey);
    font-size: var(--text-sm);
    display: flex;
    align-items: baseline;
    grid-column: 2;

    @media (max-width: 500px) {
        grid-column: 1 / 3;
    }
`
