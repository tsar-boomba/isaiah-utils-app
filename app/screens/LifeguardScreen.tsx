import React, { useContext, useState } from 'react';
import {
	Alert,
	View,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import NumberFormat from 'react-number-format';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ThemeContext, { colors } from '../context/theme-context';
import NumberInput from '../components/NumberInput';
import RadioButtonContainer from '../components/RadioButtonContainer';

import { LifeguardScreenNavigationProp } from '../config/types';

type Props = {
	navigation: LifeguardScreenNavigationProp;
};

type ScheduleParams = {
	numOfGuards: number | null;
	timeToSwap: number | null;
	startHour: number | null;
	startMinute: number | null;
	amPm: string | null;
};

const LifeguardScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);
	const [numOfGuards, setNumOfGuards] = useState<number | null>(null);
	const [timeToSwap, setTimeToSwap] = useState<number | null>(null);
	const [startHour, setStartHour] = useState<number | null>(null);
	const [startMinute, setStartMinute] = useState<number | null>(null);
	const [amPm, setAmPm] = useState<string | null>(null);

	const scheduleParams: ScheduleParams = {
		numOfGuards: numOfGuards,
		timeToSwap: timeToSwap,
		startHour: startHour,
		startMinute: startMinute,
		amPm: amPm,
	};

	const storePreferences = async (value: ScheduleParams) => {
		try {
			const jsonValue = JSON.stringify(value);
			await AsyncStorage.setItem('lifeguardPreferences', jsonValue);
		} catch (e) {
			Alert.alert('Error', 'There was an error while saving your data', [{ text: 'Okay' }]);
		}
	};

	const onSubmit = () => {
		if (
			Number.isNaN(numOfGuards) ||
			Number.isNaN(timeToSwap) ||
			Number.isNaN(startHour) ||
			Number.isNaN(startMinute) ||
			amPm === null
		) {
			Alert.alert(
				'You have an invalid input',
				'Make sure all inputs are filled and you have selected AM or PM',
				[{ text: 'Okay' }]
			);
			return;
		}

		Alert.alert('Perferences', 'Would you like to save your inputs for fast use later?', [
			{ text: 'No' },
			{ text: 'Yes', onPress: storePreferences(scheduleParams) },
		]);
	};

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}
			contentContainerStyle={{ alignItems: 'center' }}
		>
			<View style={styles.inputContainer}>
				<Text style={[styles.inputTitle, { color: dark ? colors.light : colors.dark }]}>
					Input the number of guards working
				</Text>
				<NumberFormat
					customInput={NumberInput}
					value={numOfGuards}
					limit={10}
					setState={setNumOfGuards}
					placeholder={'Number Of Guards'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={[styles.inputTitle, { color: dark ? colors.light : colors.dark }]}>
					Input the time between swaps
				</Text>
				<NumberFormat
					customInput={NumberInput}
					value={timeToSwap}
					limit={60}
					setState={setTimeToSwap}
					placeholder={'Time to swap'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={[styles.inputTitle, { color: dark ? colors.light : colors.dark }]}>
					Input the starting hour
				</Text>
				<NumberFormat
					customInput={NumberInput}
					value={startHour}
					limit={12}
					setState={setStartHour}
					placeholder={'Starting hour'}
				/>
			</View>
			<View style={styles.inputContainer}>
				<Text style={[styles.inputTitle, { color: dark ? colors.light : colors.dark }]}>
					Input the starting minute
				</Text>
				<NumberFormat
					customInput={NumberInput}
					value={startMinute}
					limit={59}
					setState={setStartMinute}
					placeholder={'Starting hour'}
				/>
			</View>
			<RadioButtonContainer
				values={['AM', 'PM']}
				state={amPm}
				setState={setAmPm}
				customStyle={false}
			/>
			<TouchableOpacity style={styles.submitButton}>
				<Text style={styles.submitButtonText} onPress={onSubmit}>
					Submit
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	inputContainer: {
		margin: 10,
		padding: 10,
	},
	inputTitle: {
		fontSize: 18,
		marginLeft: 7,
	},
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
	},
	submitButton: {
		justifyContent: 'center',
		alignContent: 'center',
		padding: 10,
		marginTop: 30,
		backgroundColor: colors.primary,
	},
	submitButtonText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: 'black',
	},
});

export default LifeguardScreen;
