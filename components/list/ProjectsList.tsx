import styled from 'styled-components'
import { Article, H3 } from './LatestPosts'

export default function ProjectsList() {
    return (
        <Project>
            <ImageContainer>
                <img
                    src="/images/PUYL.svg"
                    alt="Abstract broken circle shape"
                    width={60}
                    height={60}
                />
            </ImageContainer>
            <div>
                <H3>Prompt up your life</H3>
                <P>
                    A random prompt generator for practising UI design/development and illustration
                </P>
                <TechContainer>
                    <Tech>Tech used:</Tech>
                    <UL>
                        <LI>Svelte</LI>,<LI>TypeScript</LI>
                    </UL>
                </TechContainer>
            </div>
        </Project>
    )
}

const Project = styled(Article)`
    display: flex;
`

const P = styled.p`
    margin: var(--space-xs) 0;
    color: var(--light-grey);
`

const ImageContainer = styled.div`
    margin-right: var(--space-lg);
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
`
