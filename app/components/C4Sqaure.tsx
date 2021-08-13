import React, { useState, useContext, useEffect } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	state: any[];
	value: {
		value: string;
		won: boolean;
	};
}

const C4Sqaure: React.FC<Props> = ({ state, value }) => {
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
		height: 40,
		width: 40,
		borderWidth: 3,
		alignItems: 'center',
		justifyContent: 'center',
	},
	circle: {
		height: 35,
		width: 35,
		borderWidth: 1,
		borderRadius: 17.5,
	},
});

export default C4Sqaure;
