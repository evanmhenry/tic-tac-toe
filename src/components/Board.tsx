import { useState } from 'react'
import Square from './Square'

const calculateWinner = (squares: string[]) => {
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	]

	const winningLine = lines.find((line) => {
		const [a, b, c] = line
		return squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
	})
	return winningLine ? squares[winningLine[0]] : undefined
}

const Board = () => {
	// eslint-disable-next-line array-callback-return
	const [squares, setSquares] = useState(Array.from({ length: 9 }, () => {}))

	const [xIsNext, setXIsNext] = useState(true)

	const winner = calculateWinner(squares)
	const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`

	const handleClick = (squareIndex: number) => {
		if (!squares[squareIndex] && !calculateWinner(squares)) {
			const nextSquares = [...squares]
			nextSquares[squareIndex] = xIsNext ? 'X' : 'O'
			setSquares(nextSquares)
			setXIsNext(!xIsNext)
		}
	}

	return (
		<>
			<div className='status'>{status}</div>

			<div className='board-row'>
				<Square value={squares[0]} onSquareClick={() => handleClick(0)} />
				<Square value={squares[1]} onSquareClick={() => handleClick(1)} />
				<Square value={squares[2]} onSquareClick={() => handleClick(2)} />
			</div>
			<div className='board-row'>
				<Square value={squares[3]} onSquareClick={() => handleClick(3)} />
				<Square value={squares[4]} onSquareClick={() => handleClick(4)} />
				<Square value={squares[5]} onSquareClick={() => handleClick(5)} />
			</div>
			<div className='board-row'>
				<Square value={squares[6]} onSquareClick={() => handleClick(6)} />
				<Square value={squares[7]} onSquareClick={() => handleClick(7)} />
				<Square value={squares[8]} onSquareClick={() => handleClick(8)} />
			</div>
		</>
	)
}

export default Board
