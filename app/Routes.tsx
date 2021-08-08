import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LifeguardScreen from './screens/LifeguardScreen';
import LifeguardResultsScreen from './screens/LifeguardResultsScreen';

import { StackParamsList } from './config/types';

const Stack = createStackNavigator<StackParamsList>();

const Routes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
				<Stack.Screen
					name='Lifeguard'
					component={LifeguardScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name='Lifeguard Results'
					component={LifeguardResultsScreen}
					options={{ headerShown: false }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default Routes;
