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
	const [disabled, setDisabled] = useState(false);
	const [board, setBoard] = useState(['', '', '', '', '', '', '', '', '']);

	return (
		<View style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}>
			<View style={styles.gameBoard}>
				{board.map((sqaure, index) => (
					<TTTSquare
						state={[turn, setTurn, board, setBoard]}
						value={sqaure}
						num={index}
						globalDisabled={disabled}
						key={index}
					/>
				))}
			</View>
			<Pressable
				style={[styles.resetButton, { backgroundColor: dark ? colors.light : colors.dark }]}
				onPress={async () => {
					setBoard(['', '', '', '', '', '', '', '', '']);
					setDisabled(true);
					setDisabled(false);
					setTurn(true);
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
