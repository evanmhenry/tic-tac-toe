import { useState } from 'react'
import Board from './Board'

const Game = () => {
	const [history, setHistory] = useState([Array.from({ length: 9 }).fill(null)])
	const [currentMove, setCurrentMove] = useState(0)
	// eslint-disable-next-line unicorn/prefer-at
	const currentSquares = history[currentMove]
	const xIsNext = currentMove % 2 === 0

	function handlePlay(nextSquares: string[]) {
		const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
		setHistory(nextHistory)
		setCurrentMove(nextHistory.length - 1)
	}

	function jumpTo(move: number) {
		setCurrentMove(move)
	}

	const moves = history.map((squares: string[], move: number) => {
		const description = move > 0 ? `Go to move #${move}` : 'Go to game start'
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
				<Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
			</div>
			<div className='game-info'>
				<ol>{moves}</ol>
			</div>
		</div>
	)
}

export default Game
