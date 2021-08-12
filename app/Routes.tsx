import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LifeguardScreen from './screens/LifeguardScreen';
import LifeguardResultsScreen from './screens/LifeguardResultsScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';

import { StackParamsList } from './config/types';

const Stack = createStackNavigator<StackParamsList>();

const Routes = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name='Home'
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
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
					<Stack.Screen
						name='TicTacToe'
						component={TicTacToeScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default Routes;
