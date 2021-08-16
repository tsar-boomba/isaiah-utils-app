import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, StatusBar, Text, Pressable } from 'react-native';

import { ShopBagScreenNavigationProp } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import ShopContext from '../../context/shop-context';
import BagItem from '../../components/Shop/BagItem';

interface Props {
	navigation: ShopBagScreenNavigationProp;
}

const BagScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);
	const { bag, addToBag, removeFromBag, clearBag } = useContext(ShopContext);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}
			contentContainerStyle={{ alignItems: 'center' }}
		>
			{bag.length ? (
				bag.map((item, index) => <BagItem item={item} key={index} />)
			) : (
				<Text style={{ color: dark ? colors.light : colors.dark }}>
					{' '}
					There is nothing in your bag
				</Text>
			)}
			{bag.length ? (
				<Pressable onPress={clearBag} style={styles.clearBagButton}>
					<Text>Clear Bag</Text>
				</Pressable>
			) : null}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
	},
	clearBagButton: {
		backgroundColor: colors.primary,
		margin: 20,
		padding: 10,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default BagScreen;
