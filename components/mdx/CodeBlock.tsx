import { useRef } from 'react'
import { copyCodeToClipboard } from '../../lib/copyCodeToClipboard'
import styles from './CodeBlock.module.css'

const CodeBlock = (props: any) => {
    const codeRef = useRef<HTMLPreElement>(null)
    const title = props.children.props.title

    return (
        <>
            <div className={styles.TitleContainer}>
                {title ? <span>{title}</span> : null}
                <span style={{ marginLeft: 'auto' }}>
                    <button
                        className={styles.CopyButton}
                        onClick={() => copyCodeToClipboard(codeRef)}
                    >
                        Copy
                    </button>
                </span>
            </div>
            <pre {...props} ref={codeRef}>
                {props.children}
            </pre>
        </>
    )
}

export default CodeBlock
