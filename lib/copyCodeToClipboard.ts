import { RefObject } from 'react'

export const copyCodeToClipboard = (ref: RefObject<HTMLPreElement>) => {
    if (ref.current?.innerText) {
        const str = ref.current.innerText
        navigator.clipboard.writeText(str)
    }
}
