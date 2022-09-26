import React from 'react';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';

const {width} = Dimensions.get('screen');

export interface MostPopularCardProps {
  id: number;
  categoryId: number;
  name: string;
  image: string;
  rating: string;
  price: string;
}

export const MostPopularCard = (item: MostPopularCardProps) => (
  <TouchableOpacity activeOpacity={0.6} key={item.id}>
    <View
      style={{
        flexDirection: 'row',
        width: width - 60,
        backgroundColor: colors.semilightgrey,
        borderRadius: 25,
        marginHorizontal: 10,
        padding: 10,
        marginBottom: 25,
      }}>
      <Image
        source={{uri: item.image}}
        style={{
          height: width * 0.5 - 20,
          width: width * 0.4,
          resizeMode: 'contain',
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          marginHorizontal: 10,
          width: width * 0.4 - 10,
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: 15,
            padding: 5,
          }}>
          <Text
            style={{
              color: colors.active,
              fontFamily: 'SF-Pro-Rounded-Bold',
              fontSize: 19,
              textAlign: 'center',
            }}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Icon name="star" size={20} color={colors.darkgrey} />
            <Text
              style={{
                color: colors.darkgrey,
                fontFamily: 'SF-Pro-Rounded-Regular',
                fontSize: 18,
                marginLeft: 10,
              }}>
              {item.rating}
            </Text>
          </View>
        </View>
        <Text
          style={{
            marginTop: 5,
            color: colors.active,
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontSize: 22,
            textAlign: 'center',
            backgroundColor: colors.background,
            borderRadius: 15,
            padding: 5,
          }}>
          {item.price}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

export const MostPopularCardEmpty = () => (
  <View
    style={{
      flexDirection: 'row',
      width: width - 40,
    }}>
    <View
      style={{
        height: width * 0.5 - 20,
        width: width * 0.5 - 20,
        backgroundColor: colors.lightgrey,
        borderRadius: 15,
      }}
    />
    <View
      style={{
        flexDirection: 'column',
        paddingLeft: 10,
      }}>
      <Text
        style={{
          color: colors.active,
          fontFamily: 'SF-Pro-Rounded-Bold',
          fontSize: 24,
          width: width * 0.5 - 30,
          borderBottomColor: colors.lightgrey,
          borderBottomWidth: 3,
        }}>
        Category is Empty
      </Text>
      <Text
        style={{
          color: colors.grey,
          fontFamily: 'SF-Pro-Rounded-Regular',
          fontSize: 18,
          width: width * 0.5 - 30,
        }}>
        Try to look at another
      </Text>
    </View>
  </View>
);
