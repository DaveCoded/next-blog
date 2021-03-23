import { useState, useEffect } from 'react'

const NUM_ROWS = 4
const NUM_COLS = 4
const NUM_TILES = NUM_ROWS * NUM_COLS
const EMPTY_INDEX = NUM_TILES - 1
const SHUFFLE_MOVES_RANGE = [60, 80]
const MOVE_DIRECTIONS: Direction[] = ['up', 'down', 'left', 'right']

type Direction = 'up' | 'down' | 'left' | 'right'

function rand(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1))
}

class GameState {
    moves: number
    board: number[][]
    stack: number[][][]
    shuffling: boolean

    static instance: GameState | null = null

    static getInstance() {
        if (!GameState.instance) GameState.instance = new GameState()
        return GameState.instance
    }

    static getNewBoard() {
        return Array(NUM_TILES)
            .fill(0)
            .map((x, index) => [Math.floor(index / NUM_ROWS), index % NUM_COLS])
    }

    static solvedBoard = GameState.getNewBoard()

    constructor() {
        this.startNewGame()
    }

    startNewGame() {
        this.moves = 0
        this.board = GameState.getNewBoard()
        this.stack = []
        this.shuffle() // we are still to define this method,
        // let's put a stub in its place for now
    }

    shuffle() {
        this.shuffling = true
        let shuffleMoves = rand(SHUFFLE_MOVES_RANGE[0], SHUFFLE_MOVES_RANGE[1])
        while (shuffleMoves-- > 0) {
            this.moveInDirection(MOVE_DIRECTIONS[rand(0, 3)])
        }
        this.shuffling = false
    }

    isSolved() {
        for (let i = 0; i < NUM_TILES; i++) {
            if (
                this.board[i][0] !== GameState.solvedBoard[i][0] ||
                this.board[i][1] !== GameState.solvedBoard[i][1]
            )
                return false
        }
        return true
    }

    canMoveTile(index: number) {
        // if the tile index is invalid, we can't move it
        if (index < 0 || index >= NUM_TILES) return false

        // get the current position of the tile and the empty tile
        const tilePos = this.board[index]
        const emptyPos = this.board[EMPTY_INDEX]

        // if they are in the same row, then difference in their
        // column indices must be 1
        if (tilePos[0] === emptyPos[0]) return Math.abs(tilePos[1] - emptyPos[1]) === 1
        // if they are in the same column, then difference in their
        // row indices must be 1
        else if (tilePos[1] === emptyPos[1]) return Math.abs(tilePos[0] - emptyPos[0]) === 1
        // otherwise they are not adjacent
        else return false
    }

    moveTile(index: number) {
        // if we are not shuffling, and the board is already solved,
        // then we don't need to move anything
        // Note that, the isSolved method is not defined yet
        // let's stub that to return false always, for now
        if (!this.shuffling && this.isSolved()) return false

        // if the tile can not be moved in the first place ...
        if (!this.canMoveTile(index)) return false

        // Get the positions of the tile and the empty tile
        const emptyPosition = [...this.board[EMPTY_INDEX]]
        const tilePosition = [...this.board[index]]

        // copy the current board and swap the positions
        let boardAfterMove = [...this.board]
        boardAfterMove[EMPTY_INDEX] = tilePosition
        boardAfterMove[index] = emptyPosition

        // update the board, moves counter and the stack
        if (!this.shuffling) this.stack.push(this.board)
        this.board = boardAfterMove
        if (!this.shuffling) this.moves += 1

        return true
    }

    moveInDirection(dir: Direction) {
        // get the position of the empty square
        const epos = this.board[EMPTY_INDEX]

        // deduce the position of the tile, from the direction
        // if the direction is 'up', we want to move the tile
        // immediately below empty, if direction is 'down', then
        // the tile immediately above empty and so on
        const posToMove =
            dir === 'up'
                ? [epos[0] + 1, epos[1]]
                : dir === 'down'
                ? [epos[0] - 1, epos[1]]
                : dir === 'left'
                ? [epos[0], epos[1] + 1]
                : dir === 'right'
                ? [epos[0], epos[1] - 1]
                : epos

        // find the index of the tile currently in posToMove
        let tileToMove = EMPTY_INDEX
        for (let i = 0; i < NUM_TILES; i++) {
            if (this.board[i][0] === posToMove[0] && this.board[i][1] === posToMove[1]) {
                tileToMove = i
                break
            }
        }

        // move the tile
        this.moveTile(tileToMove)
    }

    undo() {
        if (this.stack.length === 0) return false
        ;(this.board as any) = this.stack.pop()
        this.moves -= 1
    }

    getState() {
        // inside the object literal, `this` will refer to
        // the object we are making, not to the current GameState instance.
        // So, we will store the context of `this` in a constant called `self`
        // and use it.
        // Another way to do it is to use GameState.instance instead of self.
        // that will work, because GameState is a singleton class.

        const self = this

        return {
            board: self.board,
            moves: self.moves,
            solved: self.isSolved()
        }
    }
}

type GameStateReturn = [
    number[][],
    number,
    boolean,
    () => void,
    () => void,
    (i: number) => () => void
]

export function useGameState(): GameStateReturn {
    // get the current GameState instance
    const gameState = GameState.getInstance()

    // create a react state from the GameState instance
    const [state, setState] = useState(gameState.getState())

    // start a new game and update the react state
    function newGame() {
        gameState.startNewGame()
        setState(gameState.getState())
    }

    // undo the latest move and update the react state
    function undo() {
        gameState.undo()
        setState(gameState.getState())
    }

    // return a function that will move the i-th tile
    // and update the react state
    function move(i: number) {
        return function () {
            gameState.moveTile(i)
            setState(gameState.getState())
        }
    }

    useEffect(() => {
        // attach the keyboard event listeners to document
        function listeners(event: KeyboardEvent) {
            if (event.key === 'ArrowLeft') gameState.moveInDirection('left')
            else if (event.key === 'ArrowUp') gameState.moveInDirection('up')
            else if (event.key === 'ArrowRight') gameState.moveInDirection('right')
            else if (event.key === 'ArrowDown') gameState.moveInDirection('down')

            setState(gameState.getState())
        }

        document.addEventListener('keyup', listeners)

        // remove the evant listeners when the app unmounts
        return () => document.removeEventListener('keyup', listeners)
    }, [gameState])
    // this effect hook will run only when the GameState instance changes.
    // That is, only when the app is mounted and the GameState instance
    // is created

    // expose the state and the update functions for the components
    return [state.board, state.moves, state.solved, newGame, undo, move]
}
