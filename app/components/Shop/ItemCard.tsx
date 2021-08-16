import React, { useContext } from 'react';
import { Pressable, StyleSheet, Image, Text } from 'react-native';

import { ShopHomeScreenNavigationProp } from '../../config/types';
import { Item } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import ShopContext from '../../context/shop-context';

interface Props {
	item: Item;
	navigation: ShopHomeScreenNavigationProp;
}

const ItemCard: React.FC<Props> = ({ item, navigation }) => {
	const { dark } = useContext(ThemeContext);
	const { bag, addToBag, removeFromBag, favorites, addFavorite, removeFavorite, settings } =
		useContext(ShopContext);

	const onItemPress = () => {
		navigation.navigate('Item', item);
	};

	return (
		<Pressable
			onPress={onItemPress}
			style={[
				styles.card,
				{
					borderColor: dark ? colors.light : colors.dark,
					backgroundColor: dark ? colors.dark : colors.light,
				},
			]}
		>
			<Image source={{ uri: item.imageUrls[0], height: 200 }} />
			<Text style={[styles.cardText, { color: dark ? colors.light : colors.dark }]}>
				{item.name}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	card: {
		width: '90%',
		height: 300,
		margin: 10,
		padding: 10,
		borderWidth: 5,
		borderRadius: 20,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2,
		elevation: 0,
	},
	cardText: {
		fontSize: 32,
	},
});

export default ItemCard;
