import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const ShopContext = React.createContext({
	bag: [],
	addToBag: (item) => {},
	removeFromBag: (target, num) => {},
	clearBag: () => {},
	favorites: [],
	addFavorite: (item) => {},
	removeFavorite: (target) => {},
	settings: {
		defaultSize: '',
	},
});

export default ShopContext;

export const ShopContextProvider = (props) => {
	const [bag, setBag] = useState([]);
	const [favorites, setFavorites] = useState([]);
	const [settings, setSettings] = useState({ defaultSize: 'M' });

	/*	bag data schema
		{ item: item, quantity: number, size: string }
		[{ item , quantity, size }, { item , quantity, size }, { item , quantity, size }, { item , quantity, size }]
	*/
	const addToBag = (item) => {
		if (item.quantity <= 0) return;
		const newBag = [...bag];
		if (newBag.length <= 0 && item.quantity <= item.item.limit) {
			newBag.push(item);
			setBag(newBag);
			return;
		}
		for (let index = 0; index < newBag.length; index++) {
			const bagItem = newBag[index];
			if (bagItem.item.name === item.item.name && bagItem.size === item.size) {
				if (bagItem.quantity + item.quantity > item.item.limit && item.item.limit > 0) {
					Alert.alert(
						'Limit Error',
						'Adding this to bag would be above the limit for this item.'
					);
					return;
				}
				newBag.splice(index, 1, {
					item: item.item,
					quantity: bagItem.quantity + item.quantity,
					size: bagItem.size,
				});
				setBag(newBag);
				return;
			}
		}
		newBag.push(item);
		setBag(newBag);
		return;
	};

	const removeFromBag = (target, num) => {
		if (num <= 0) return;
		const newBag = [...bag];
		for (let index = 0; index < newBag.length; index++) {
			const bagItem = newBag[index];
			if (bagItem.item.name === target.item.name && bagItem.size === target.size) {
				if (num > bagItem.quantity) return;
				if (bagItem.quantity - num <= 0) {
					newBag.splice(index, 1);
					setBag(newBag);
					return;
				}
				newBag.splice(index, 1, {
					item: bagItem.item,
					quantity: bagItem.quantity - num,
					size: bagItem.size,
				});
				setBag(newBag);
				return;
			}
		}
	};

	const clearBag = () => {
		setBag([]);
	};

	const addFavorite = (item) => {
		if (favorites.includes(item)) return;
		setFavorites((prev) => [...prev, item]);
	};

	const removeFavorite = (target) => {
		const newFavs = [...favorites];
		for (let index = 0; index < newFavs.length; index++) {
			const favorite = newFavs[index];
			if (favorite.name === target) {
				newFavs.splice(index, 1);
				setFavorites(newFavs);
				return;
			}
		}
	};

	useEffect(() => {
		setBag((prev) => prev);
		setFavorites((prev) => prev);
		setSettings((prev) => prev);
	}, [bag, favorites, settings]);

	return (
		<ShopContext.Provider
			value={{
				bag,
				addToBag,
				removeFromBag,
				clearBag,
				favorites,
				addFavorite,
				removeFavorite,
				settings,
			}}
		>
			{props.children}
		</ShopContext.Provider>
	);
};
