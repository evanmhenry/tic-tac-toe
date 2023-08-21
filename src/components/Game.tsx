import { useCallback, useState } from 'react'
import Board from './Board'

const Game = () => {
	const [history, setHistory] = useState<string[][]>([Array.from({ length: 9 }).fill('') as string[]])
	const [currentMove, setCurrentMove] = useState(0)
	const currentSquares = history[currentMove]
	const xIsNext = currentMove % 2 === 0

	const handlePlay = useCallback(
		(nextSquares: string[]) => {
			const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
			setHistory(nextHistory)
			setCurrentMove(nextHistory.length - 1)
		},
		[history, currentMove],
	)

	function jumpTo(move: number) {
		setCurrentMove(move)
	}

	const moves = history.map((squares: string[], move: number) => {
		if (move === currentMove) {
			return <li key={squares[move]}>You are at move #{move}</li>
		}

		const description = move > 0 ? `Go to move #${move}` : 'Go to game start'
		return (
			<li key={squares[move]}>
				<button type='button' onClick={() => jumpTo(move)}>
					{description}
				</button>
			</li>
		)
	})

	return (
		<div className='game'>
			<div className='game-board'>
				<Board xIsNext={xIsNext} squares={currentSquares as string[]} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}

export default Game
