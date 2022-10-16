/* eslint-disable @typescript-eslint/no-explicit-any */
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useReducer, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../AppNavigator';
import {Button} from '../../components/Button';
import {CartCard} from '../../components/CartCard';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
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
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(firebase.auth().currentUser);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getStoreItems();
    getCartItems();
  }, []);

  useEffect(() => {
    getTotalPrice();
  }, [cartItems]);

  const updateTemp = () => {
    getCartItems();
  };

  const getTotalPrice = () => {
    let total = 0;
    for (const item of cartItems) {
      total = total + item.price;
    }
    setTotalPrice(total);
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
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginBottom: 20,
          paddingBottom: 10,
          borderBottomWidth: 3,
          borderColor: colors.input,
        }}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 22,
            color: colors.darkgrey,
            textAlign: 'center',
          }}>
          Hello, {user.email}!
        </Text>
        <TouchableOpacity
          onPress={() => {
            firebase.auth().signOut();
          }}>
          <Icon
            name="exit-outline"
            size={sizes.defaultIcon}
            color={colors.darkgrey}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getCartItems} />
        }>
        {cartItems.map((item, key) => getCartItem(item, key, updateTemp))}
      </ScrollView>
      {cartItems.length > 0 ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 10,
          }}>
          <View style={{width: '38%'}}>
            <Text
              style={{
                fontFamily: 'URWGeometricArabic-Bold',
                fontSize: 18,
                color: colors.darkgrey,
              }}>
              Total Price
            </Text>
            <Text
              style={{
                fontFamily: 'URWGeometricArabic-Bold',
                fontSize: 25,
                color: colors.active,
              }}>
              {totalPrice} PLN
            </Text>
          </View>
          <Button title={'Checkout'} containerStyle={{width: '60%'}} />
        </View>
      ) : (
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 18,
            color: colors.grey,
            marginBottom: 10,
            textAlign: 'center',
          }}>
          If Cart Is Empty Try To Refresh It
        </Text>
      )}
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
