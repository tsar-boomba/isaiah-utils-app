import React, { useContext, useState } from 'react';
import { View, StatusBar, StyleSheet, Text, Pressable } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';
import C4Sqaure from '../components/C4Sqaure';

import { Connect4ScreenNavigationProp } from '../config/types';

type Props = {
	navigation: Connect4ScreenNavigationProp;
};

const Connect4Screen: React.FC<Props> = () => {
	const { dark } = useContext(ThemeContext);
	//true means red places
	const [turn, setTurn] = useState(true);
	const [currRow, setCurrRow] = useState<number>();
	const [currCol, setCurrCol] = useState<number>();
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
	/* 
	
		[
			['', '', '', '', '', ''],
			['', '', '', '', '', ''],
			['', '', '', '', '', ''],
			['', '', '', '', '', ''],
			['', '', '', '', '', ''],
			['', '', '', '', '', ''],
		]
	
	*/
	const [board, setBoard] = useState(emptyBoard);

	const generateBoard = (
		elem: { value: string; won: boolean },
		rowNum: number,
		colNum: number
	) => {
		return (
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
					currRow,
					setCurrRow,
					currCol,
					setCurrCol,
				]}
				value={elem}
				rowNum={rowNum}
				colNum={colNum}
				key={rowNum.toString() + ' ' + colNum.toString()}
			/>
		);
	};

	return (
		<View style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}>
			<View style={styles.gameBoard}>
				{board.map((row, rowNum) =>
					row.map((square, colNum) => {
						return generateBoard(square, rowNum, colNum);
					})
				)}
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	gameBoard: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center',
		justifyContent: 'center',
		width: 'auto',
		height: 'auto',
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

export default Connect4Screen;
