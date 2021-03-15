interface Props {
    children: string
}

const Dropcap = ({ children }: Props) => {
    const firstLetter = children[0]
    const remainder = children.slice(1)

    return (
        <p className="BlogPost__Paragraph">
            <span aria-hidden="true">
                <span className="dropcap">{firstLetter}</span>
            </span>
            {remainder}
            <span className="sr-only">{children}</span>
        </p>
    )
}

export default Dropcap
