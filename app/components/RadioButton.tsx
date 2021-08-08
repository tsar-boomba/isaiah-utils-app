import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	buttonStyle?: object | object[];
	buttonTextStyle?: object | object[];
	value: string | number | boolean;
	state: any;
	setState: any;
	customStyle: boolean;
}

const RadioButton: React.FC<Props> = ({
	buttonStyle,
	buttonTextStyle,
	value,
	state,
	setState,
	customStyle,
}) => {
	const { dark } = useContext(ThemeContext);

	if (customStyle) {
		return (
			<TouchableOpacity style={buttonStyle} onPress={() => setState(value)}>
				<Text style={buttonTextStyle}>{value}</Text>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity
				style={[styles.button, { backgroundColor: dark ? colors.light : colors.dark }]}
				onPress={() => setState(value)}
			>
				<Text style={[styles.buttonText, { color: dark ? colors.dark : colors.light }]}>
					{value}
				</Text>
			</TouchableOpacity>
		);
	}
};

const styles = StyleSheet.create({
	button: {
		borderRadius: 5,
		margin: 10,
		padding: 5,
	},
	buttonText: {
		fontSize: 16,
	},
});

export default RadioButton;
