import { RefObject } from 'react'

export const copyCodeToClipboard = async (ref: RefObject<HTMLPreElement>) => {
    if (ref.current?.innerText) {
        const str = ref.current.innerText
        return navigator.clipboard.writeText(str)
    }
}
