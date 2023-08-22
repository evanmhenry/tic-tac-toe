type Props = {
	value: string
	onSquareClick: () => void
	isWinning?: boolean
}

const Square = ({ value, onSquareClick, isWinning }: Props) => {
	const className = isWinning ? 'square square-winner' : 'square'

	return (
		<button type='button' className={className} onClick={onSquareClick}>
			{value}
		</button>
	)
}

export default Square
