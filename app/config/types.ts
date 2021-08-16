import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	CompositeNavigationProp,
	NavigatorScreenParams,
	RouteProp,
} from '@react-navigation/native';

//type for shop item data
export type Item = {
	name: string;
	price: number;
	description: string;
	sizes: {
		name: string;
		stock: number;
	}[];
	limit: number;
	imageUrls: string[];
};

export type StackParamsList = {
	Home: undefined;
	Lifeguard: undefined;
	'Lifeguard Results': {
		numOfGuards: number | null;
		timeToSwap: number | null;
		startHour: number | null;
		startMinute: number | null;
		amPm: string | null;
	};
	TicTacToe: undefined;
	Connect4: undefined;
	Shop: undefined;
	Item: Item;
};

export type HomeScreenNavigationProp = StackNavigationProp<StackParamsList, 'Home'>;

export type LifeguardScreenNavigationProp = StackNavigationProp<StackParamsList, 'Lifeguard'>;

export type LifeguardResultsScreenNavigationProp = StackNavigationProp<
	StackParamsList,
	'Lifeguard Results'
>;

export type LifeguardResultsScreenRouteProp = RouteProp<StackParamsList, 'Lifeguard Results'>;

export type TicTacToeScreenNavigationProp = StackNavigationProp<StackParamsList, 'TicTacToe'>;

export type Connect4ScreenNavigationProp = StackNavigationProp<StackParamsList, 'Connect4'>;

export type ShopNavigationProp = StackNavigationProp<StackParamsList, 'Shop'>;

/*   Shop types    */
export type ShopParamsList = {
	ShopRoutes: NavigatorScreenParams<StackParamsList>;
	Home: undefined;
	Favorites: undefined;
	Bag: undefined;
};

export type ShopHomeScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<ShopParamsList, 'Home'>,
	StackNavigationProp<StackParamsList>
>;

export type ShopBagScreenNavigationProp = CompositeNavigationProp<
	BottomTabNavigationProp<ShopParamsList, 'Bag'>,
	StackNavigationProp<StackParamsList>
>;

export type ItemScreenRouteProp = RouteProp<StackParamsList, 'Item'>;

export type ItemScreenNavigationProp = StackNavigationProp<StackParamsList, 'Item'>;
