import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import RadioButton from './RadioButton';

interface Props {
	containerStyle?: object | object[];
	buttonStyle?: object | object[];
	buttonTextStyle?: object | object[];
	values: (string | number | boolean)[];
	state: any;
	setState: any;
	customStyle: boolean;
}

const RadioButtonContainer: React.FC<Props> = ({
	containerStyle,
	buttonStyle,
	buttonTextStyle,
	values,
	state,
	setState,
	customStyle,
}) => {
	if (customStyle) {
		return (
			<View style={containerStyle}>
				{values.map((_, index) => {
					return (
						<RadioButton
							value={values[index]}
							state={state}
							setState={setState}
							customStyle={customStyle}
							buttonStyle={buttonStyle}
							buttonTextStyle={buttonTextStyle}
							key={index}
						/>
					);
				})}
			</View>
		);
	} else {
		return (
			<View style={styles.buttonContainer}>
				{values.map((_, index) => {
					return (
						<RadioButton
							value={values[index]}
							state={state}
							setState={setState}
							customStyle={customStyle}
							key={index}
						/>
					);
				})}
			</View>
		);
	}
};

const styles = StyleSheet.create({
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
});

export default RadioButtonContainer;
