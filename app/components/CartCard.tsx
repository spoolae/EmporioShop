/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';
import {CartItemProps} from '../screens/main/CartScreen';
import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';

const {width} = Dimensions.get('screen');

export const CartCard = (
  item: CartItemProps,
  navigation: any,
  key: number,
  updateCart: any,
) => {
  const removeFromCart = async () => {
    await firestore()
      .collection(firebase.auth().currentUser.uid)
      .doc(item.docUID)
      .delete();
    updateCart();
  };
  return (
    <View
      key={key}
      style={{
        flexDirection: 'row',
        width: width - 60,
        backgroundColor: colors.semilightgrey,
        borderRadius: 25,
        marginHorizontal: 10,
        padding: 10,
        marginBottom: 25,
      }}>
      <View style={{flex: 1}}>
        <Image
          source={{uri: item.image}}
          style={{
            height: width * 0.275,
            width: width * 0.275,
            resizeMode: 'contain',
            borderRadius: 15,
          }}
        />
      </View>
      <View
        style={{
          flex: 2,
          marginLeft: 25,
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 20,
            color: colors.active,
          }}>
          {item.quantity}x {item.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontFamily: 'URWGeometricArabic-Bold',
              fontSize: 23,
              color: colors.active,
            }}>
            {item.price} PLN
          </Text>
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: colors.background,
              padding: 10,
            }}
            onPress={removeFromCart}>
            <Icon name="trash" size={sizes.inputIcon} color={colors.active} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
