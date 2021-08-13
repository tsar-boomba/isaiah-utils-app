import React, { useContext, useState } from 'react';
import { View, StatusBar, StyleSheet, Text } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';
import C4Sqaure from '../components/C4Sqaure';

import { Connect4ScreenNavigationProp } from '../config/types';

type Props = {
	navigation: Connect4ScreenNavigationProp;
};

const Connect4Screen: React.FC<Props> = () => {
	const { dark } = useContext(ThemeContext);
	//true means x places
	const [turn, setTurn] = useState(true);
	const [turnNum, setTurnNum] = useState(1);
	const [reset, setReset] = useState(false);
	const [gameover, setGameover] = useState(false);
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
	const [board, setBoard] = useState(emptyBoard);

	return (
		<View style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}>
			<View style={styles.gameBoard}>
				{board.map((row) => {
					row.map((square, index) => {
						<C4Sqaure
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
							value={square}
							key={index}
						/>;
					});
				})}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
	},
	gameBoard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: 280,
		height: 240,
	},
});

export default Connect4Screen;
