import React, { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import ThemeContext, { colors } from '../../context/theme-context';

interface Props {
	size: string;
	onPress: () => void;
}

const SizeButton: React.FC<Props> = ({ size, onPress }) => {
	const { dark } = useContext(ThemeContext);

	return (
		<Pressable
			style={[styles.sizeButton, { backgroundColor: dark ? colors.light : colors.dark }]}
			onPress={onPress}
		>
			<Text style={[styles.sizeButtonText, { color: dark ? colors.dark : colors.light }]}>
				{size}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	sizeButton: {
		width: 'auto',
		height: 30,
		padding: 15,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	sizeButtonText: {},
});

export default SizeButton;
