type ReadingTimeProps = {
    readingTime: string
}

export default function ReadingTime({ readingTime }: ReadingTimeProps) {
    return (
        <div>
            <span>{readingTime}</span>
        </div>
    )
}
