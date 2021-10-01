import Link from 'next/link'
import styled from 'styled-components'

type StyleProps = {
    color?: string
    hoverColor?: string
}

type Props = StyleProps & {
    tag: string
}

export default function SubjectTag({ tag, color, hoverColor }: Props) {
    return (
        <Link href={`/tag/${tag}`}>
            <a>
                <Tag color={color} hoverColor={hoverColor}>
                    {tag}
                </Tag>
            </a>
        </Link>
    )
}

const Tag = styled.li<StyleProps>`
    list-style: none;
    font-size: var(--text-sm);
    font-style: italic;
    font-weight: 400;
    text-decoration: underline;
    color: ${(props) => (props.color ? props.color : 'var(--cool-grey)')};
    transition: var(--link-hover-transition);

    &:hover {
        color: ${(props) => (props.hoverColor ? props.hoverColor : 'var(--link-pink)')};
    }
`
