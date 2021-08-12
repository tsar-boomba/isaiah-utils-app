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
	value: string;
	num: number;
	globalDisabled: boolean;
}

const TTTSquare: React.FC<Props> = ({ state, value, num, globalDisabled }) => {
	const { dark } = useContext(ThemeContext);

	const [turn, setTurn, board, setBoard] = state;
	const [disabled, setDisabled] = useState(false);

	const onSquarePress = () => {
		setDisabled(true);
		const newBoard = board;
		newBoard.splice(num, 1, turn ? 'x' : 'o');
		setBoard(newBoard);
		setTurn(!turn);
	};

	useEffect(() => {
		setDisabled(false);
	}, [globalDisabled]);

	return (
		<Pressable
			style={[
				styles.square,
				{
					borderColor: dark ? colors.light : colors.dark,
					backgroundColor: dark ? colors.dark : colors.light,
				},
			]}
			disabled={disabled}
			onPress={onSquarePress}
		>
			<Text style={[styles.text, { color: dark ? colors.light : colors.dark }]}>{value}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	square: {
		height: 80,
		width: 80,
		borderWidth: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontSize: 60,
		fontWeight: 'bold',
	},
});

export default TTTSquare;
