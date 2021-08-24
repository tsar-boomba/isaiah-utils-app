import React, { useContext } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Platform } from 'react-native';
import Animated, {
	interpolate,
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';

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
	const CARD_HEIGHT = 320;
	const { dark } = useContext(ThemeContext);
	const { bag, addToBag, favorites, addFavorite } = useContext(ShopContext);

	const translateY = useSharedValue(0);
	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event, ctx) => {
			translateY.value = event.contentOffset.y;
		},
	});

	return (
		<Animated.ScrollView
			style={[
				styles.container,
				styles.scroll,
				{ backgroundColor: dark ? colors.dark : colors.light },
			]}
			contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
			onScroll={scrollHandler}
			scrollEventThrottle={8}
		>
			{items.map((item, index) => {
				const style = useAnimatedStyle(() => {
					const scale = interpolate(
						translateY.value,
						[-1, 0, CARD_HEIGHT * index, CARD_HEIGHT * (index + 2)],
						[1, 1, 1, 0]
					);
					return {
						width: '90%',
						transform: [{ scale }],
					};
				});
				return (
					<Animated.View style={style} key={index}>
						<ItemCard item={item} navigation={navigation} />
					</Animated.View>
				);
			})}
		</Animated.ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		top: StatusBar.currentHeight,
		marginBottom: 49,
	},
	scroll: {
		marginBottom: Platform.OS == 'ios' ? null : 45,
	},
});

export default HomeScreen;
