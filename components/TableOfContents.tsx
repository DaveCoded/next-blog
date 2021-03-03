type Props = {
    headings: { text: string; level: number }[]
}

function TableOfContents({ headings }: Props) {
    return (
        <div>
            {headings.map(({ text, level }) => (
                <a
                    key={text}
                    href={`${text}`}
                    style={{ display: 'block', marginLeft: level === 2 ? 0 : level * 6 }}
                >
                    {text} - {level}
                </a>
            ))}
        </div>
    )
}

export default TableOfContents
