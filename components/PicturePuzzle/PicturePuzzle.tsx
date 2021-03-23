import { useGameState } from '../../hooks/usePuzzlePicture'
import Tile from './Tile'
import styles from './PicturePuzzle.module.css'

function PicturePuzzle() {
    const [board, moves, solved, newGame, undo, move] = useGameState()

    return (
        <div className="game-container">
            <div className="game-header">
                <div className="moves">{moves}</div>
                <button className="big-button" onClick={undo}>
                    {' '}
                    UNDO{' '}
                </button>
            </div>
            <div className={styles.Board}>
                {board.slice(0, -1).map((pos, index) => (
                    <Tile key={index} index={index} pos={pos} onClick={move(index)} />
                ))}
                {solved && (
                    <div className={styles.Overlay}>
                        <button className="big-button" onClick={newGame}>
                            PLAY AGAIN
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PicturePuzzle
