import React, { useContext, useState } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { ShopParamsList } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import ShopContext from '../../context/shop-context';
import HomeScreen from './HomeScreen';
import BagScreen from './BagScreen';

const Tab = createMaterialBottomTabNavigator<ShopParamsList>();

const ShopRoutes = () => {
	const { dark } = useContext(ThemeContext);
	const { bag } = useContext(ShopContext);
	const theme = dark ? colors.dark : colors.light;

	return (
		<Tab.Navigator initialRouteName='Home' barStyle={{ backgroundColor: colors.primary }}>
			<Tab.Screen
				name='Home'
				component={HomeScreen}
				options={{ tabBarIcon: () => <FontAwesome name='home' size={24} color='white' /> }}
			/>
			<Tab.Screen
				name='Bag'
				component={BagScreen}
				options={{
					tabBarBadge: bag.length ? bag.length : false,
					tabBarIcon: () => <FontAwesome5 name='shopping-bag' size={24} color='white' />,
				}}
			/>
		</Tab.Navigator>
	);
};

export default ShopRoutes;
