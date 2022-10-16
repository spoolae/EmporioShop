/* eslint-disable @typescript-eslint/no-explicit-any */
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useReducer, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStackParamList} from '../../AppNavigator';
import {CartCard} from '../../components/CartCard';
import {colors} from '../../constants/colors';
import {StoreItemProps} from './HomeScreen';

export interface CartItemProps {
  docUID: string;
  itemId: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export const CartScreen = () => {
  const [storeItems, setStoreItems] = useState<Array<StoreItemProps>>([]);
  const [cartItems, setCartItems] = useState<Array<CartItemProps>>([]);
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getStoreItems();
    getCartItems();
  }, []);

  const updateTemp = () => {
    getCartItems();
  };

  const getStoreItems = async () => {
    const storeItems: Array<StoreItemProps> = [];
    await firebase
      .firestore()
      .collection('storeItem')
      .orderBy('id')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          const temp: any = snapshot.data();
          storeItems.push(temp);
        });
      });
    setStoreItems(storeItems);
  };

  const getCartItems = async () => {
    const cartItems: Array<CartItemProps> = [];
    await firebase
      .firestore()
      .collection(user.uid)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          const temp: any = snapshot.data();
          cartItems.push(temp);
        });
      });
    setCartItems(cartItems);
  };

  const getCartItem = (
    item: CartItemProps,
    key: number,
    updateCart: () => void,
  ) => CartCard(item, navigation, key, updateCart);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getCartItems} />
        }>
        {cartItems.map((item, key) => getCartItem(item, key, updateTemp))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
