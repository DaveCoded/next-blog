type Props = {
    completion?: FireType
}

export type FireType = 'spark' | 'flame' | 'bonfire'

export default function FireLevel({ completion = 'spark' }: Props) {
    const emoji = completion === 'spark' ? '✨' : completion === 'flame' ? '🔥' : null
    const metaphor = completion[0].toUpperCase() + completion.slice(1)

    return (
        <span>
            {emoji}
            {metaphor}
        </span>
    )
}
