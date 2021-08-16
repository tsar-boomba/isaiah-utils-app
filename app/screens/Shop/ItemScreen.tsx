import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, View, StatusBar, StyleSheet, Image, Text, Pressable } from 'react-native';

import { ItemScreenNavigationProp, ItemScreenRouteProp } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import ShopContext from '../../context/shop-context';
import SizeButton from '../../components/Shop/SizeButton';
import AddBagButton from '../../components/Shop/AddBagButton';
import FavoriteButton from '../../components/Shop/FavoriteButton';

interface Props {
	navigation: ItemScreenNavigationProp;
	route: ItemScreenRouteProp;
}

const ItemScreen: React.FC<Props> = ({ navigation, route }) => {
	const item = route.params;
	useEffect(() => navigation.setOptions({ title: item.name }), []);
	const { dark } = useContext(ThemeContext);
	const { bag, addToBag, removeFromBag, favorites, addFavorite, removeFavorite, settings } =
		useContext(ShopContext);
	const sizes = ['XS', 'S', 'M', 'L', 'XL'];
	const [size, setSize] = useState(settings.defaultSize);
	const [quantity, setQuantity] = useState(1);

	const bagItem = {
		item: item,
		quantity: quantity,
		size: size,
	};

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}
		>
			<Image source={{ uri: item.imageUrls[0], height: 300 }} style={styles.image} />
			<Text style={[styles.title, { color: dark ? colors.light : colors.dark }]}>
				{item.name}
			</Text>
			<View style={styles.sizeContainer}>
				{sizes.map((size, index) => (
					<SizeButton size={size} onPress={() => setSize(size)} key={index} />
				))}
			</View>
			<Text style={[styles.stock, { color: dark ? colors.light : colors.dark }]}>
				{size} Stock:{' '}
				{item.sizes.map((sizeData) => {
					if (size === sizeData.name) return sizeData.stock;
				})}
			</Text>
			<View style={styles.buttonContainer}>
				<FavoriteButton item={item} />
				<AddBagButton item={item} size={size} />
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		margin: 20,
	},
	title: {
		fontSize: 42,
		fontWeight: 'bold',
		marginLeft: 10,
	},
	sizeContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 50,
		marginTop: 20,
		justifyContent: 'space-around',
	},
	stock: {
		fontSize: 32,
		marginLeft: 12,
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		height: 75,
		marginTop: 40,
		justifyContent: 'space-around',
	},
});

export default ItemScreen;
