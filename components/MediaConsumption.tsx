import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

const activities = ['reading', 'listening', 'watching'] as const
type Activity = typeof activities[number]

interface Media {
    activity: Activity
    value: string
}

type ActivityEmojiMap = {
    // eslint-disable-next-line no-unused-vars
    [Key in typeof activities[number]]: string
}

const media: Media[] = [
    {
        activity: 'reading',
        value: 'The Riddle-Master of Hed by Patricia A. McKillip'
    },
    {
        activity: 'listening',
        value: 'Remotely Interesting podcast'
    },
    {
        activity: 'watching',
        value: 'The Dropout (Theranos debacle series)'
    }
]

const emojis: ActivityEmojiMap = {
    reading: '📚',
    listening: '🎧',
    watching: '💻'
}

const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

function MediaConsumption() {
    const [index, setIndex] = useState(0)

    const setNextActivityIndex = useCallback(() => {
        setIndex((prevIndex) => {
            if (prevIndex === media.length - 1) {
                return 0
            }
            return prevIndex + 1
        })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setNextActivityIndex()
        }, 5000)

        return () => clearInterval(interval)
    }, [setNextActivityIndex])

    const { activity, value } = media[index]
    const emoji = emojis[activity]

    const handleClick = () => setNextActivityIndex()

    return (
        <MediaContainer onClick={handleClick}>
            <P>
                {emoji} {capitalise(activity)}: {value}
            </P>
        </MediaContainer>
    )
}

export const MediaContainer = styled.div`
    width: max-content;
    padding: var(--space-xs) var(--space-sm);
    border: 1px solid #32353a;
    border-radius: 4px;
    cursor: pointer;
`

const P = styled.p`
    font-size: var(--text-sm);
    margin: 0;
`

export default MediaConsumption
