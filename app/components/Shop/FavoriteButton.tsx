import React, { useContext, useEffect } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../../context/theme-context';
import { Item } from '../../config/types';

import ShopContext from '../../context/shop-context';
import { Ionicons } from '@expo/vector-icons';

interface Props {
	item: Item;
}

const FavoriteButton: React.FC<Props> = ({ item }) => {
	const { bag, addToBag, removeFromBag, favorites, addFavorite, removeFavorite, settings } =
		useContext(ShopContext);

	const onButtonPress = () => {
		addFavorite(item);
	};

	return (
		<Pressable style={[styles.addFavoriteButton]} onPress={onButtonPress}>
			<Ionicons name='heart-sharp' size={24} color='white' />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	addFavoriteButton: {
		flex: 1,
		margin: 20,
		padding: 15,
		borderRadius: 5,
		backgroundColor: colors.liked,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default FavoriteButton;
