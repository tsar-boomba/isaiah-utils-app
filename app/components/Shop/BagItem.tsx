import React, { useContext } from 'react';
import { Pressable, Text, View, StyleSheet } from 'react-native';

import { Item } from '../../config/types';

import ThemeContext, { colors } from '../../context/theme-context';
import RemoveBagButton from '../../components/Shop/RemoveBagButton';

interface Props {
	item: { item: Item; quantity: number; size: string };
}

const BagItem: React.FC<Props> = ({ item }) => {
	const { dark } = useContext(ThemeContext);

	return (
		<View style={styles.container}>
			<Text style={[styles.itemText, { color: dark ? colors.light : colors.dark }]}>
				x{item.quantity}
			</Text>
			<Pressable>
				<Text style={[styles.itemText, { color: dark ? colors.light : colors.dark }]}>
					{item.size} {item.item.name} ${item.quantity * item.item.price}
				</Text>
			</Pressable>
			<RemoveBagButton item={item} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		margin: 10,
		padding: 10,
	},
	itemText: {
		fontSize: 20,
		margin: 5,
	},
});

export default BagItem;
