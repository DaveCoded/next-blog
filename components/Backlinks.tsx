import Link from 'next/link'
import styled from 'styled-components'
import { LinkReference } from '../scripts/post-links'

type Props = {
    backlinks: LinkReference[]
}

export default function Backlinks({ backlinks }: Props) {
    return (
        <Section>
            <h2>Backlinks</h2>
            <ul>
                {backlinks.map((bl) => (
                    <Backlink key={bl.slug}>
                        <Link href={`/blog/${bl.slug}`}>
                            <a>
                                <H4>{bl.title}</H4>
                            </a>
                        </Link>
                    </Backlink>
                ))}
            </ul>
        </Section>
    )
}

const Section = styled.section`
    margin-top: var(--space-xxl);

    h2 {
        color: var(--light-black);
        margin-bottom: var(--space-sm);
    }
`

const Backlink = styled.li`
    list-style: none;
`

const H4 = styled.h4`
    color: var(--link-pink);
    margin-bottom: var(--space-xs);
    text-decoration: underline;

    &:hover {
        color: var(--purple);
    }
`
