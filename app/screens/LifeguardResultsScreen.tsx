import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet } from 'react-native';

import ThemeContext, { colors } from '../context/theme-context';
import SwapCard from '../components/SwapCard';

import {
	LifeguardResultsScreenNavigationProp,
	LifeguardResultsScreenRouteProp,
} from '../config/types';

type Props = {
	navigation: LifeguardResultsScreenNavigationProp;
	route: LifeguardResultsScreenRouteProp;
};

type StateType = number | string | null;

const LifeguardResultsScreen: React.FC<Props> = ({ route, navigation }) => {
	const { dark } = useContext(ThemeContext);
	const { numOfGuards, timeToSwap, startHour, startMinute, amPm } = route.params;

	const timeFormatter = (hour: StateType, minute: StateType, amPm: StateType) => {
		let strHour = JSON.stringify(hour);
		let strMinute = JSON.stringify(minute);

		Number.parseInt(JSON.stringify(minute)) < 10
			? (strMinute = '0' + strMinute)
			: (strMinute = strMinute);

		return strHour + ':' + strMinute + ' ' + amPm;
	};

	let rotationsStartHour = startHour;

	if (startHour === 12) {
		rotationsStartHour = 0;
	}

	const rotations =
		amPm === 'AM'
			? //I'm assuming end time is 9pm (21), could be use input later
			  (21 - rotationsStartHour) * (60 / timeToSwap)
			: (21 - (rotationsStartHour + 12)) * (60 / timeToSwap);

	const generateSchedule = () => {
		const tempCardData: { time: string; guardNum: number }[] = [];
		let hour = startHour;
		let minute = startMinute;
		let meridian = amPm;
		let guardNum = 1;

		for (let index = 0; index < rotations; index++) {
			if (index > 0) {
				if (hour === 12 && minute < timeToSwap) {
					meridian === 'AM' ? (meridian = 'PM') : (meridian = 'AM');
				}
			}

			tempCardData.push({ time: timeFormatter(hour, minute, meridian), guardNum: guardNum });

			guardNum++;
			minute += timeToSwap;

			if (minute > 59) {
				minute -= 60;
				hour += 1;
			}

			if (hour > 12) {
				hour = 1;
			}

			if (guardNum > numOfGuards) {
				guardNum = 1;
			}
		}

		return tempCardData;
	};

	const cardData = generateSchedule();

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}
		>
			{cardData.map((card, index) => (
				<SwapCard time={card.time} guardNum={card.guardNum} key={index} />
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
		marginBottom: 55,
	},
});

export default LifeguardResultsScreen;
