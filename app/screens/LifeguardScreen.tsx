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
	startTime: string;
	startHour: number | null;
	startMinute: number | null;
	amPm: string | null;
};

const LifeguardScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);
	const [numOfGuards, setNumOfGuards] = useState<number | null>(null);
	const [timeToSwap, setTimeToSwap] = useState<number | null>(null);
	const [startTime, setStartTime] = useState<string | null>('');
	const [amPm, setAmPm] = useState<string | null>(null);

	const scheduleParams: ScheduleParams = {
		numOfGuards: numOfGuards,
		timeToSwap: timeToSwap,
		startTime: startTime,
		startHour: Number.parseInt(startTime.substring(0, 2)),
		startMinute: Number.parseInt(startTime.substring(3, 5)),
		amPm: amPm,
	};

	const sampleRes = {
		batchcomplete: '',
		continue: {
			grncontinue: '0.041989886399|0.041990203076|49556188|0',
			continue: 'grncontinue||',
		},
		query: {
			pages: {
				32960115: {
					pageid: 32960115,
					ns: 0,
					title: "Journal de l'\u00eele de La R\u00e9union",
					extract:
						"Journal de l'\u00eele de La R\u00e9union is a daily, French-language newspaper published in R\u00e9union, a French overseas department. The newspaper, which was founded in 1951 is headquartered in Saint-Denis, R\u00e9union, is owned by Groupe Hersant M\u00e9dia. There are four competing newspapers in R\u00e9union.",
					thumbnail: {
						source: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Centre-d%27affaires-Cadjee.jpg/50px-Centre-d%27affaires-Cadjee.jpg',
						width: 50,
						height: 33,
					},
					original: {
						source: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Centre-d%27affaires-Cadjee.jpg',
						width: 3888,
						height: 2592,
					},
					pageimage: "Centre-d'affaires-Cadjee.jpg",
				},
			},
		},
	};
	const currPage = Object.keys(sampleRes.query.pages)[0];

	const timeInputFormat = (value: string) => {
		const currentValue = value.length ? value.substring(value.length - 1, value.length) : value;
		const parsedInput = Number.parseInt(currentValue);

		if (startTime.length === 0) {
			if (Number.isNaN(parsedInput)) {
				setStartTime((prev) => prev);
			} else if (parsedInput > 1) {
				setStartTime((prev) => prev + '1');
			} else {
				setStartTime((prev) => prev + parsedInput);
			}
		} else if (startTime.length === 1) {
			if (Number.isNaN(parsedInput)) {
				setStartTime((prev) => prev);
			} else if (parsedInput > 2) {
				setStartTime((prev) => prev + '2');
			} else {
				setStartTime((prev) => prev + parsedInput + ':');
			}
		} else if (startTime.length === 3) {
			if (Number.isNaN(parsedInput)) {
				setStartTime((prev) => prev);
			} else if (parsedInput > 5) {
				setStartTime((prev) => prev + '5');
			} else {
				setStartTime((prev) => prev + parsedInput);
			}
		} else if (startTime.length === 4) {
			if (Number.isNaN(parsedInput)) {
				setStartTime((prev) => prev);
			} else if (parsedInput > 9) {
				setStartTime((prev) => prev + '9');
			} else {
				setStartTime((prev) => prev + parsedInput);
			}
		} else if (startTime.length > 4) {
			setStartTime((prev) => prev);
		}
	};

	const savePreferences = async () => {
		if (
			Number.isNaN(numOfGuards) ||
			Number.isNaN(timeToSwap) ||
			startTime.length < 5 ||
			amPm === null
		) {
			Alert.alert(
				'You have an invalid input',
				'Make sure all inputs are filled and you have selected AM or PM',
				[{ text: 'Okay' }]
			);
			return;
		}
		try {
			const jsonValue = JSON.stringify(scheduleParams);
			await AsyncStorage.setItem('lifeguardPreferences', jsonValue);
		} catch (error) {
			Alert.alert('Error', 'There was an error while saving your data', [{ text: 'Okay' }]);
		}
	};

	const usePreferences = async () => {
		try {
			const stringValue = await AsyncStorage.getItem('lifeguardPreferences');
			const jsonValue: ScheduleParams = await JSON.parse(stringValue);
			if (
				Number.isNaN(jsonValue.numOfGuards) ||
				Number.isNaN(jsonValue.timeToSwap) ||
				Number.isNaN(jsonValue.startHour) ||
				Number.isNaN(jsonValue.startMinute) ||
				jsonValue.amPm === null
			) {
				Alert.alert(
					'Error',
					'There was an error while saving your data, did you save a preference?',
					[{ text: 'Okay' }]
				);
			} else {
				setNumOfGuards(jsonValue.numOfGuards);
				setTimeToSwap(jsonValue.timeToSwap);
				setStartTime(jsonValue.startTime);
				setAmPm(jsonValue.amPm);
			}
		} catch (error) {
			Alert.alert('Error', 'There was an error while saving your data', [{ text: 'Okay' }]);
		}
	};

	const onSubmit = () => {
		if (
			Number.isNaN(numOfGuards) ||
			Number.isNaN(timeToSwap) ||
			startTime.length < 5 ||
			amPm === null
		) {
			Alert.alert(
				'You have an invalid input',
				'Make sure all inputs are filled and you have selected AM or PM',
				[{ text: 'Okay' }]
			);
			return;
		}

		navigation.navigate('Lifeguard Results', scheduleParams);
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
					Input the starting time
				</Text>
				<TextInput
					style={[
						styles.input,
						{
							backgroundColor: dark ? colors.dark : colors.light,
							borderColor: dark ? colors.light : colors.dark,
							color: dark ? colors.light : colors.dark,
						},
					]}
					value={startTime}
					onChangeText={(value) => timeInputFormat(value)}
					placeholder={'Start time'}
					placeholderTextColor={dark ? colors.light : colors.dark}
					keyboardType={'number-pad'}
				/>
			</View>
			<TouchableOpacity
				style={[styles.button, { backgroundColor: dark ? colors.light : colors.dark }]}
				onPress={() => setStartTime('')}
			>
				<Text style={[styles.buttonText, { color: dark ? colors.dark : colors.light }]}>
					Clear Start Time
				</Text>
			</TouchableOpacity>
			<Text style={[styles.inputTitle, { color: dark ? colors.light : colors.dark }]}>
				Pick AM or PM for start time
			</Text>
			<RadioButtonContainer
				values={['AM', 'PM']}
				state={amPm}
				setState={setAmPm}
				customStyle={false}
			/>
			<View>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: dark ? colors.light : colors.dark }]}
					onPress={() => savePreferences()}
				>
					<Text style={[styles.buttonText, { color: dark ? colors.dark : colors.light }]}>
						Save Prefernces
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, { backgroundColor: dark ? colors.light : colors.dark }]}
					onPress={() => usePreferences()}
				>
					<Text style={[styles.buttonText, { color: dark ? colors.dark : colors.light }]}>
						Use Preferences
					</Text>
				</TouchableOpacity>
			</View>
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
	input: {
		marginTop: 6,
		borderRadius: 10,
		borderWidth: 2,
		padding: 8,
		width: 300,
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
	button: {
		borderRadius: 5,
		margin: 10,
		padding: 5,
	},
	buttonText: {
		fontSize: 16,
	},
});

export default LifeguardScreen;
