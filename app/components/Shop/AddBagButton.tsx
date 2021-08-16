import React, { useContext, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View, Modal, Alert } from 'react-native';

import { colors } from '../../context/theme-context';
import { Item } from '../../config/types';

import ShopContext from '../../context/shop-context';
import NumberFormat from 'react-number-format';
import NumberInput from '../NumberInput';

interface Props {
	item: Item;
	size: string;
}

const AddBagButton: React.FC<Props> = ({ item, size }) => {
	const { bag, addToBag, removeFromBag, favorites, addFavorite, removeFavorite, settings } =
		useContext(ShopContext);
	const [modalVisible, setModalVisible] = useState(false);
	const [quantity, setQuantity] = useState(1);

	const onAddBagPress = () => {
		setModalVisible(true);
	};

	const onModalPress = () => {
		if (quantity <= 0) {
			Alert.alert('Quantity Error', 'Quantity must be greater than 0.');
			return;
		}
		addToBag({ item: item, quantity: quantity, size: size });
		setModalVisible(!modalVisible);
	};

	return (
		<>
			<View>
				<Modal animationType='slide' transparent={true} visible={modalVisible}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={styles.modalText}>
								How many {item.name}(s) would you like to buy? (Limit: {item.limit})
							</Text>
							<NumberFormat
								customInput={NumberInput}
								value={quantity}
								limit={item.limit}
								setState={setQuantity}
								placeholder={'Quantity'}
							/>
							<View style={{ flexDirection: 'row' }}>
								<Pressable
									style={styles.modalButton}
									onPress={() => setModalVisible(!modalVisible)}
								>
									<Text style={styles.modalButtonText}>Nervermind</Text>
								</Pressable>
								<Pressable style={styles.modalButton} onPress={onModalPress}>
									<Text style={styles.modalButtonText}>Add To Bag</Text>
								</Pressable>
							</View>
						</View>
					</View>
				</Modal>
			</View>

			<Pressable style={[styles.addBagButton]} onPress={onAddBagPress}>
				<Text style={[styles.addBagButtonText]}>Add To Bag</Text>
			</Pressable>
		</>
	);
};

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 35,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalButton: {
		margin: 20,
		padding: 10,
		borderRadius: 5,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalButtonText: {
		fontWeight: 'bold',
	},
	addBagButton: {
		flex: 6,
		margin: 20,
		padding: 15,
		borderRadius: 5,
		backgroundColor: colors.primary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addBagButtonText: {
		fontSize: 28,
		fontWeight: 'bold',
	},
	modalText: {
		marginBottom: 15,
		textAlign: 'center',
	},
});

export default AddBagButton;
