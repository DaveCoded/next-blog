import Link from 'next/link'
import styled from 'styled-components'
import { LinkReference } from '../scripts/post-links'

type Props = {
    backlinks: LinkReference[]
}

export default function Backlinks({ backlinks }: Props) {
    if (backlinks.length < 1) return null

    return (
        <Section>
            <h2>Backlinks</h2>
            <ul>
                {backlinks.map((bl) => (
                    <li key={bl.slug}>
                        <Link href={`/blog/${bl.slug}`}>
                            <a>
                                <H3>{bl.title}</H3>
                                <p>{bl.excerpt}</p>
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </Section>
    )
}

const Section = styled.section`
    margin-top: var(--space-xxl);

    h2 {
        margin-bottom: var(--space-lg);
    }

    li {
        padding: var(--space-md);
        border: 2px solid var(--light-black);
        border-radius: 4px;
        list-style: none;

        p {
            font-size: var(--text-sm);
        }
    }

    & * {
        color: var(--light-black);
    }
`

const H3 = styled.h3`
    margin-bottom: var(--space-xs);
`
