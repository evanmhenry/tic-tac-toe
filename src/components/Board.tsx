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

	if (winningLine) {
		return {
			winner: squares[winningLine[0]],
			winningLine,
		}
	}
}

function isBoardFull(squares: string[]) {
	return squares.every(Boolean)
}

const Board = ({ xIsNext, squares, onPlay }: { xIsNext: boolean; squares: string[]; onPlay: (squares: string[]) => void }) => {
	const result = calculateWinner(squares)
	const winner = result?.winner
	const winningLine = result?.winningLine

	const isWinningSquare = (index: number) => winningLine?.includes(index) || false

	let status

	if (winner) {
		status = `Winner: ${winner}`
	} else if (isBoardFull(squares)) {
		status = 'Draw!'
	} else {
		status = `Next player: ${xIsNext ? 'X' : 'O'}`
	}

	const handleClick = (square: number) => {
		if (calculateWinner(squares) || squares[square]) {
			return
		}
		const nextSquares = [...squares]
		nextSquares[square] = xIsNext ? 'X' : 'O'
		onPlay(nextSquares)
	}

	return (
		<>
			<div className='status'>{status}</div>

			{(() => {
				const board = []
				for (let i = 0; i < 3; i += 1) {
					const row = []
					for (let j = 0; j < 3; j += 1) {
						const index = i * 3 + j
						row.push(<Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} isWinning={isWinningSquare(index)} />)
					}
					board.push(
						<div key={i} className='board-row'>
							{row}
						</div>,
					)
				}
				return board
			})()}
		</>
	)
}

export default Board
