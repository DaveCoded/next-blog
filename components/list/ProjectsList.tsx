import styled from 'styled-components'
import { Article, H3, Span } from './LatestPosts'

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
                <div>
                    <Span>
                        Tech used:
                        <UL>
                            <LI>Svelte</LI>,<LI>TypeScript</LI>
                        </UL>
                    </Span>
                </div>
            </div>
        </Project>
    )
}

const Project = styled(Article)`
    display: flex;
`

const P = styled.p`
    margin: 0.6rem 0;
`

const ImageContainer = styled.div`
    margin-right: 2rem;
`

const LI = styled.li`
    list-style: none;
    margin-left: 8px;
`

const UL = styled.ul`
    display: inline-flex;
    margin-top: 0;
`
