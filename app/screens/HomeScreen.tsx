import React, { useContext } from 'react';
import { View, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';

import { HomeScreenNavigationProp } from '../config/types';

import ThemeContext, { colors } from '../context/theme-context';

import ThemeToggle from '../components/ThemeToggle';

type Props = {
	navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);

	return (
		<View style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('Lifeguard')}
			>
				<Text style={styles.buttonText}>Lifeguard</Text>
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.navigate('TicTacToe')}
			>
				<Text style={styles.buttonText}>TicTacToe</Text>
			</TouchableOpacity>
			<ThemeToggle />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		height: 'auto',
		width: 'auto',
		justifyContent: 'center',
		alignContent: 'center',
		padding: 10,
		marginTop: 30,
		backgroundColor: colors.primary,
	},
	buttonText: {
		fontSize: 20,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		top: StatusBar.currentHeight,
	},
	footer: {
		height: 'auto',
	},
});

export default HomeScreen;
