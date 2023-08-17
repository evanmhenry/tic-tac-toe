type Props = {
	value: string
	onSquareClick: () => void
}

const Square = ({ value, onSquareClick }: Props) => (
	<button type='button' className='square' onClick={onSquareClick}>
		{value}
	</button>
)

export default Square
