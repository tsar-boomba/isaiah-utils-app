import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
	CompositeNavigationProp,
	NavigatorScreenParams,
	RouteProp,
} from '@react-navigation/native';

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
};

export type HomeScreenNavigationProp = StackNavigationProp<StackParamsList, 'Home'>;

export type LifeguardScreenNavigationProp = StackNavigationProp<StackParamsList, 'Lifeguard'>;

export type LifeguardResultsScreenNavigationProp = StackNavigationProp<
	StackParamsList,
	'Lifeguard Results'
>;

export type LifeguardResultsScreenRouteProp = RouteProp<StackParamsList, 'Lifeguard Results'>;
