import Link from 'next/link'
import styled from 'styled-components'

type Props = {
    tag: string
    color?: string
    backgroundColor?: string
    hoverBackgroundColor?: string
}

export default function TagPill({ tag, color, backgroundColor, hoverBackgroundColor }: Props) {
    return (
        <Link href={`/tag/${tag}`}>
            <a>
                <Tag
                    color={color}
                    backgroundColor={backgroundColor}
                    hoverBackgroundColor={hoverBackgroundColor}
                >
                    {tag}
                </Tag>
            </a>
        </Link>
    )
}

type StyleProps = {
    color?: string
    backgroundColor?: string
    hoverBackgroundColor?: string
}

const Tag = styled.li<StyleProps>`
    list-style: none;
    font-size: var(--text-xs);
    background-color: ${(props) =>
        props.backgroundColor ? props.backgroundColor : 'var(--light-black)'};
    color: ${(props) => (props.color ? props.color : 'var(--cool-grey)')};
    border-radius: 100px;
    padding: var(--space-xxs) var(--space-sm);
    transition: var(--link-hover-transition);

    &:hover {
        background-color: ${(props) => (props.color ? props.hoverBackgroundColor : '#363a3c')};
        a {
            color: inherit;
        }
    }
`
