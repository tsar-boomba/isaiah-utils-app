import React, { useContext, useEffect, useState } from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	/*
    this is so that the game can know the state of each sqaure
    and the sqaure can know whose turt it is
    */
	state: any[];
	//spot on the board 0 being top left, 8 being bottom right
	value: {
		value: string;
		won: boolean;
	};
	num: number;
}

const TTTSquare: React.FC<Props> = ({ state, value, num }) => {
	const { dark } = useContext(ThemeContext);

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
	] = state;
	const [disabled, setDisabled] = useState(false);

	const resetSquare = () => {
		setDisabled(false);
		setReset(false);
	};

	const gameEnded = () => {
		setDisabled(true);
		setGameover(false);
	};

	const checkHorizontal = (pos: number) => {
		const first = board[pos].value;

		if (first === '') return;

		if (board[pos + 1].value === first) {
			if (board[pos + 2].value === first && board[pos + 2].value === board[pos + 1].value) {
				const endBoard = board;
				for (let index = 0; index < 3; index++) {
					endBoard.splice(pos + index, 1, { value: first, won: true });
				}
				setBoard(endBoard);
				setGameover(true);
			}
		}
	};

	const checkVertical = (pos: number) => {
		const first = board[pos].value;

		if (first === '') return;

		if (board[pos + 3].value === first) {
			if (board[pos + 6].value === first && board[pos + 6].value === board[pos + 3].value) {
				const endBoard = board;
				for (let index = 0; index < 3; index++) {
					endBoard.splice(pos + index * 3, 1, { value: first, won: true });
				}
				setBoard(endBoard);
				setGameover(true);
			}
		}
	};

	const checkDiagonal = (pos: number) => {
		const first = board[pos].value;

		if (first === '') return;

		if (pos === 2) {
			if (board[pos + 2].value === first) {
				if (
					board[pos + 4].value === first &&
					board[pos + 4].value === board[pos + 2].value
				) {
					const endBoard = board;
					for (let index = 0; index < 3; index++) {
						endBoard.splice(pos + index * 2, 1, { value: first, won: true });
					}
					setBoard(endBoard);
					setGameover(true);
				}
			}
		} else {
			if (board[pos + 4].value === first) {
				if (
					board[pos + 8].value === first &&
					board[pos + 8].value === board[pos + 4].value
				) {
					const endBoard = board;
					for (let index = 0; index < 3; index++) {
						endBoard.splice(pos + index * 4, 1, { value: first, won: true });
					}
					setBoard(endBoard);
					setGameover(true);
				}
			}
		}
	};

	const onSquarePress = () => {
		setDisabled(true);
		const newBoard = board;
		newBoard.splice(num, 1, { value: turn ? 'x' : 'o', won: false });
		setBoard(newBoard);
		setTurnNum((prev: number) => prev + 1);
		for (let index = 0; index < board.length; index++) {
			const square = board[index];
			//when checking the rows for wins
			if (index === 0 || index === 3 || index === 6) {
				checkHorizontal(index);
			}
			if (index === 0 || index === 1 || index === 2) {
				checkVertical(index);
			}
			if (index === 0 || index === 2) {
				checkDiagonal(index);
			}
		}
		setTurn(!turn);
	};

	useEffect(resetSquare, [reset]);
	useEffect(gameEnded, [gameover]);
	useEffect(() => setDisabled(false), []);

	return (
		<Pressable
			style={[
				styles.square,
				value.won
					? { borderColor: dark ? colors.light : colors.dark, backgroundColor: 'green' }
					: {
							borderColor: dark ? colors.light : colors.dark,
							backgroundColor: dark ? colors.dark : colors.light,
					  },
			]}
			disabled={disabled}
			onPress={onSquarePress}
		>
			<Text style={[styles.text, { color: dark ? colors.light : colors.dark }]}>
				{value.value}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	square: {
		height: 80,
		width: 80,
		padding: 0,
		borderWidth: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 60,
		fontWeight: 'bold',
		margin: 0,
	},
});

export default TTTSquare;
