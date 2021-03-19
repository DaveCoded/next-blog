import { RefObject } from 'react'

export const copyCodeToClipboard = (ref: RefObject<HTMLPreElement>) => {
    if (ref.current?.innerText) {
        const str = ref.current.innerText
        const el = document.createElement('textarea')
        el.value = str
        el.setAttribute('readonly', '')
        el.style.position = 'absolute'
        el.style.left = '-9999px'
        document.body.appendChild(el)
        el.select()
        document.execCommand('copy')
        document.body.removeChild(el)
    }
}
