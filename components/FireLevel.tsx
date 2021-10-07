import { useState } from 'react'
import styled from 'styled-components'
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'

type Props = {
    completion?: FireType
}

export type FireType = 'spark' | 'flame' | 'bonfire'

export default function FireLevel({ completion = 'spark' }: Props) {
    const [visible, setVisible] = useState(false)
    const show = () => setVisible(true)
    const hide = () => setVisible(false)

    const emoji = completion === 'spark' ? '✨' : completion === 'flame' ? '🕯' : '🔥'
    const metaphor = completion[0].toUpperCase() + completion.slice(1)

    return (
        <Tippy
            visible={visible}
            onClickOutside={hide}
            content={
                <div>
                    <strong>From least complete to most:</strong>{' '}
                    <OL>
                        <li>✨ Spark - sketchy notes</li>
                        <li>🕯 Flame - proper post</li>
                        <li>🔥 Bonfire - fully researched</li>
                    </OL>
                </div>
            }
        >
            <Span onClick={visible ? hide : show}>
                {emoji} {metaphor}
            </Span>
        </Tippy>
    )
}

const OL = styled.ol`
    padding-inline-start: 1.3rem;
    font-size: 14px;
    line-height: 1.4;
    margin-bottom: 0;
`

const Span = styled.span`
    cursor: help;
`
