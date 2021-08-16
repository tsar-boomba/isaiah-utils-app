import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import LifeguardScreen from './screens/LifeguardScreen';
import LifeguardResultsScreen from './screens/LifeguardResultsScreen';
import TicTacToeScreen from './screens/TicTacToeScreen';
import Connect4Screen from './screens/Connect4Screen';
import ShopRoutes from './screens/Shop/ShopRoutes';
import ItemScreen from './screens/Shop/ItemScreen';

import { StackParamsList } from './config/types';

const Stack = createStackNavigator<StackParamsList>();

const Routes = () => {
	return (
		<SafeAreaView style={{ flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name='Home' component={HomeScreen} />
					<Stack.Screen name='Lifeguard' component={LifeguardScreen} />
					<Stack.Screen name='Lifeguard Results' component={LifeguardResultsScreen} />
					<Stack.Screen name='TicTacToe' component={TicTacToeScreen} />
					<Stack.Screen name='Connect4' component={Connect4Screen} />
					<Stack.Screen name='Shop' component={ShopRoutes} />
					<Stack.Screen
						name='Item'
						component={ItemScreen}
						options={{ headerShown: true }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default Routes;
