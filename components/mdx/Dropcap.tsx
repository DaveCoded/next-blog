interface Props {
    children: string
}

const Dropcap = ({ children }: Props) => {
    const firstLetter = children[0]
    const remainder = children.slice(1)

    return (
        <p>
            <span aria-hidden="true">
                <span className="dropcap">{firstLetter}</span>
                {remainder}
            </span>
            <span className="sr-only">{children}</span>
        </p>
    )
}

export default Dropcap
