import React, { useContext } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import ThemeContext, { colors } from '../context/theme-context';

const ThemeToggleButton: React.FC = () => {
	const { dark, toggleTheme } = useContext(ThemeContext);

	return (
		<View style={styles.switchContainer}>
			<Text
				style={[
					styles.switchText,
					{
						color: dark ? colors.light : colors.dark,
					},
				]}
			>
				Toggle Theme
			</Text>
			<Switch
				trackColor={{ true: '#767577', false: '#81b0ff' }}
				thumbColor={!dark ? '#f5dd4b' : '#f4f3f4'}
				ios_backgroundColor='#3e3e3e'
				onValueChange={toggleTheme}
				value={dark}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	switchContainer: {
		alignItems: 'center',
		marginTop: 100,
	},
	switchText: {
		fontSize: 18,
	},
});

export default ThemeToggleButton;
