import React, { useContext, useState } from 'react';
import { Pressable, Text, View, StatusBar, StyleSheet } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';
import TTTSquare from '../components/TTTSquare';

import { TicTacToeScreenNavigationProp } from '../config/types';

type Props = {
	navigation: TicTacToeScreenNavigationProp;
};

const TicTacToeScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);
	//true means x places
	const [turn, setTurn] = useState(true);
	const [turnNum, setTurnNum] = useState(1);
	const [reset, setReset] = useState(false);
	const [gameover, setGameover] = useState(false);
	const emptyBoard = [
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
		{ value: '', won: false },
	];
	const [board, setBoard] = useState(emptyBoard);

	return (
		<View style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}>
			<Text style={[styles.resetButtonText, { color: dark ? colors.light : colors.dark }]}>
				Turn: {turnNum}
			</Text>
			<View style={styles.gameBoard}>
				{board.map((sqaure, index) => (
					<TTTSquare
						state={[
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
						]}
						value={sqaure}
						num={index}
						key={index}
					/>
				))}
			</View>
			<Pressable
				style={[styles.resetButton, { backgroundColor: dark ? colors.light : colors.dark }]}
				onPress={() => {
					setReset(true);
					setBoard(emptyBoard);
					setTurn(true);
					setTurnNum(1);
				}}
			>
				<Text
					style={[styles.resetButtonText, { color: dark ? colors.dark : colors.light }]}
				>
					Reset Game
				</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},
	gameBoard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 240,
		height: 240,
	},
	resetButton: {
		margin: 10,
		padding: 10,
		borderRadius: 6,
	},
	resetButtonText: {
		fontSize: 16,
	},
});

export default TicTacToeScreen;
