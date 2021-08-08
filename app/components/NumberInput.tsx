import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';

interface Props {
	value: any;
	limit: number;
	setState: any;
	placeholder: string;
}

const NumberInput: React.FC<Props> = ({ value, limit, setState, placeholder }) => {
	const { dark } = useContext(ThemeContext);

	const checkLimit = (value: string, limit: number) => {
		const parsedInput = Number.parseInt(value);
		if (Number.isNaN(parsedInput)) {
			setState('');
		} else if (parsedInput > limit) {
			setState(limit);
		} else {
			setState(parsedInput);
		}
	};

	return (
		<TextInput
			style={[
				styles.input,
				{
					backgroundColor: dark ? colors.dark : colors.light,
					borderColor: dark ? colors.light : colors.dark,
					color: dark ? colors.light : colors.dark,
				},
			]}
			value={value}
			onChangeText={(value: string) => checkLimit(value, limit)}
			placeholder={placeholder}
			placeholderTextColor={dark ? colors.light : colors.dark}
			keyboardType={'number-pad'}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		marginTop: 6,
		borderRadius: 10,
		borderWidth: 2,
		padding: 8,
		width: 300,
	},
});

export default NumberInput;
