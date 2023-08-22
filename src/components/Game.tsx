import { useCallback, useState } from 'react'
import Board from './Board'

const Game = () => {
	const [history, setHistory] = useState<{ squares: string[]; lastMoveIndex: number | undefined }[]>([
		{ squares: Array.from({ length: 9 }, () => '') as string[], lastMoveIndex: undefined },
	])
	const [currentMove, setCurrentMove] = useState(0)
	const [isAscending, setIsAscending] = useState(true)
	const currentSquares = history[currentMove]
	const xIsNext = currentMove % 2 === 0

	const handlePlay = useCallback(
		(nextSquares: string[], moveIndex: number) => {
			const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, lastMoveIndex: moveIndex }]
			setHistory(nextHistory)
			setCurrentMove(nextHistory.length - 1)
		},
		[history, currentMove],
	)

	function jumpTo(move: number) {
		setCurrentMove(move)
	}

	function toggleSort() {
		setIsAscending(!isAscending)
	}

	const orderedHistory = isAscending ? history : [...history].reverse()

	const moves = orderedHistory.map((entry, index) => {
		const move = isAscending ? index : history.length - 1 - index
		const row = Math.floor(entry.lastMoveIndex! / 3) + 1
		const col = (entry.lastMoveIndex! % 3) + 1

		if (move === currentMove) {
			return <li key={move}>You are at move #{move}</li>
		}

		const description = move === 0 ? 'Go to game start' : `Go to move #${move} (${row}, ${col})`
		return (
			<li key={move}>
				<button type='button' onClick={() => jumpTo(move)}>
					{description}
				</button>
			</li>
		)
	})

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={xIsNext} squaresData={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<button type='button' onClick={toggleSort}>
					{isAscending ? 'Sort Descending' : 'Sort Ascending'}
				</button>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}

export default Game
