import { CSSProperties } from 'react'

function Spacer({ height }: { height: CSSProperties['height'] }) {
    return <div style={{ height: height }} />
}

export default Spacer
