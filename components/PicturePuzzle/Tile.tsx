import styles from './Tile.module.css'

interface Props {
    index: number
    pos: number[]
    onClick: () => void
}

function Tile({ index, pos, onClick }: Props) {
    const top = pos[0] * 100 + 5
    const left = pos[1] * 100 + 5
    const bgLeft = (index % 4) * 100 + 5
    const bgTop = Math.floor(index / 4) * 100 + 5

    return (
        <div
            className={styles.Tile}
            onClick={onClick}
            style={{ top, left, backgroundPosition: `-${bgLeft}px -${bgTop}px` }}
        />
    )
}

export default Tile
