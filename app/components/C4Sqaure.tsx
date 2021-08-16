import React, { useState, useContext, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	state: any[];
	value: {
		value: string;
		won: boolean;
	};
	rowNum: number;
	colNum: number;
}

const C4Sqaure: React.FC<Props> = ({ state, value, rowNum, colNum }) => {
	const { dark } = useContext(ThemeContext);

	const emptyBoard = [
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
		[
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
			{ value: '', won: false },
		],
	];

	const [
		turn,
		setTurn,
		turnNum,
		setTurnNum,
		board,
		setBoard,
		reset,
		setReset,
		gameover,
		setGameover,
		currRow,
		setCurrRow,
		currCol,
		setCurrCol,
	] = state;
	const [disabled, setDisabled] = useState(false);
	const MAX_HORI = 6;
	const MAX_VERT = 5;

	const resetSquare = () => {
		setDisabled(false);
		setBoard(emptyBoard);
		setReset(false);
	};

	const gameEnded = () => {
		setDisabled(true);
		setGameover(false);
	};

	const pieceGravity = () => {
		let index = 0;
		const newBoard = board;
		for (index = newBoard.length - 1; index > -1; index--) {
			const square = newBoard[index][colNum];
			if (square.value === '') {
				newBoard[index].splice(colNum, 1, { value: turn ? 'red' : 'yellow', won: false });
				setBoard(newBoard);
				return [newBoard, index];
			}
		}
	};

	const checkHorizontal = (currBoard: { value: string; won: boolean }[][], currRow: number) => {
		const start: number = colNum;
		const row: number = currRow;
		const currentValue: string = currBoard[row][start].value;
		let right: number = start + 1;
		let left: number = start - 1;
		const winCondition = ['win'];
		//check pieces to left and right of new piece
		for (let index = 0; index < 3; index++) {
			if (right <= MAX_HORI) {
				if (currentValue === currBoard[row][right].value) {
					winCondition.push('win');
					right += 1;
				}
			}
			if (left >= 0) {
				if (currentValue === currBoard[row][left].value) {
					winCondition.push('win');
					left -= 1;
				}
			}
			if (winCondition.length >= 4) {
				setGameover(true);
				break;
			}
		}
	};

	const checkVertical = (currBoard: { value: string; won: boolean }[][], currRow: number) => {
		const start: number = currRow;
		const col: number = colNum;
		const currentValue: string = currBoard[start][col].value;
		let up: number = start - 1;
		let down: number = start + 1;
		const winCondition = ['win'];
		//check pieces to left and right of new piece
		for (let index = 0; index < 3; index++) {
			if (down <= MAX_VERT) {
				if (currentValue === currBoard[down][col].value) {
					winCondition.push('win');
					down += 1;
				}
			}
			if (up >= 0) {
				if (currentValue === currBoard[up][col].value) {
					winCondition.push('win');
					up -= 1;
				}
			}
			if (winCondition.length >= 4) {
				setGameover(true);
				break;
			}
		}
	};

	const checkDiagonal = (currBoard: { value: string; won: boolean }[][], currRow: number) => {
		const startRow: number = currRow;
		const startCol: number = colNum;
		const currentValue: string = currBoard[startRow][startCol].value;
		let up = startRow - 1;
		let right = startCol + 1;
		let down = startRow + 1;
		let left = startCol - 1;
		//two win condition because 2 diagonal directions
		const winCondition1 = ['/'];
		const winCondition2 = ['\\'];
		//check pieces to left and right of new piece
		for (let index = 0; index < 3; index++) {
			if (down <= MAX_VERT && left >= 0) {
				if (currentValue === currBoard[down][left].value) {
					winCondition1.push('/');
					down += 1;
					left -= 1;
				}
			}
			if (up >= 0 && right <= MAX_HORI) {
				if (currentValue === currBoard[up][right].value) {
					winCondition1.push('/');
					up -= 1;
					right += 1;
				}
			}
			if (winCondition1.length >= 4) {
				setGameover(true);
				break;
			}
		}

		up = startRow - 1;
		right = startCol + 1;
		down = startRow + 1;
		left = startCol - 1;

		for (let index = 0; index < 3; index++) {
			if (down <= MAX_VERT && right <= MAX_HORI) {
				if (currentValue === currBoard[down][right].value) {
					winCondition2.push('\\');
					down += 1;
					right += 1;
				}
			}
			if (up >= 0 && left >= 0) {
				if (currentValue === currBoard[up][left].value) {
					winCondition2.push('\\');
					up -= 1;
					left -= 1;
				}
			}
			if (winCondition2.length >= 4) {
				setGameover(true);
				break;
			}
		}
	};

	const onSquarePress = () => {
		const [currBoard, currRow] = pieceGravity();
		checkHorizontal(currBoard, currRow);
		checkVertical(currBoard, currRow);
		checkDiagonal(currBoard, currRow);
		setTurnNum((prev: number) => prev + 1);
		setTurn(!turn);
	};

	useEffect(resetSquare, [reset]);
	useEffect(gameEnded, [gameover]);
	useEffect(() => setDisabled(false), []);

	return (
		<Pressable
			style={[
				styles.square,
				{
					borderColor: dark ? colors.light : colors.dark,
					backgroundColor: dark ? colors.dark : colors.light,
				},
			]}
			onPress={onSquarePress}
			disabled={disabled}
		>
			<View
				style={[
					styles.circle,
					{ borderColor: dark ? colors.light : colors.dark },
					value.value === ''
						? { backgroundColor: dark ? colors.dark : colors.light }
						: value.value === 'red'
						? { backgroundColor: 'red' }
						: { backgroundColor: 'yellow' },
				]}
			></View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	square: {
		height: 50,
		width: 50,
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circle: {
		height: 45,
		width: 45,
		borderWidth: 1,
		borderRadius: 27.5,
	},
});

export default C4Sqaure;
