import { useRouter } from 'next/router'

type Props = {
    headings: { text: string; level: number }[]
}

function TableOfContents({ headings }: Props) {
    const route = useRouter().asPath

    console.log('headings', headings)
    return (
        <div>
            {headings.map(({ text, level }) => {
                const link = text.toLowerCase().replaceAll(' ', '-')
                const href = `${route}#${link}`

                return (
                    // todo: add new <ol> for each new nested level
                    // if level is greater than the previous level, add an <ol>
                    <a
                        key={text}
                        href={href}
                        style={{ display: 'block', marginLeft: level === 2 ? 0 : level * 6 }} // todo: sort this indentation maths
                    >
                        {text} - {level}
                    </a>
                )
            })}
        </div>
    )
}

export default TableOfContents
