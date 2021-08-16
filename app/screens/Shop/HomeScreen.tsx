import React, { useContext } from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';

import { ShopHomeScreenNavigationProp } from '../../config/types';
import { Item } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import ShopContext from '../../context/shop-context';
import rawItems from './product-data.json';
const items: Item[] = rawItems;
import ItemCard from '../../components/Shop/ItemCard';

interface Props {
	navigation: ShopHomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
	const { dark } = useContext(ThemeContext);
	const { bag, addToBag, favorites, addFavorite } = useContext(ShopContext);

	return (
		<ScrollView
			style={[styles.container, { backgroundColor: dark ? colors.dark : colors.light }]}
			contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
		>
			{items.map((item, index) => {
				return <ItemCard item={item} navigation={navigation} key={index} />;
			})}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
		marginBottom: 49,
	},
});

export default HomeScreen;
