import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	animationStyle: { transform: { scale: number }[] };
	time: string;
	name?: string;
	guardNum: number;
}

const SwapCard: React.FC<Props> = ({ animationStyle, time, name, guardNum }) => {
	const { dark } = useContext(ThemeContext);

	return (
		<Animated.View
			style={[
				styles.card,
				{
					borderColor: dark ? colors.light : colors.dark,
					backgroundColor: dark ? colors.dark : colors.light,
				},
				animationStyle,
			]}
		>
			<Text
				style={[
					styles.cardTime,
					{
						color: dark ? colors.light : colors.dark,
					},
				]}
			>
				{time}
			</Text>
			<Text
				style={[
					styles.cardText,
					{
						color: dark ? colors.light : colors.dark,
					},
				]}
			>
				Guard {guardNum}
			</Text>
		</Animated.View>
	);
};

const styles = StyleSheet.create({
	card: {
		flexDirection: 'row',
		margin: 20,
		marginTop: 8,
		marginBottom: 8,
		padding: 10,
		justifyContent: 'space-around',
		borderWidth: 3,
		borderRadius: 8,
	},
	cardTime: {
		fontWeight: 'bold',
		fontSize: 16,
	},
	cardText: {
		fontSize: 16,
	},
});

export default SwapCard;
