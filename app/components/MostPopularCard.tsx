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
        width: width - 40,
      }}>
      <Image
        source={{uri: item.image}}
        style={{
          height: width * 0.5 - 20,
          width: width * 0.5 - 20,
          resizeMode: 'contain',
          borderRadius: 15,
        }}
      />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingLeft: 10,
        }}>
        <Text
          style={{
            color: colors.active,
            fontFamily: 'SF-Pro-Rounded-Bold',
            fontSize: 24,
            width: width * 0.5 - 20,
            borderBottomColor: colors.lightgrey,
            borderBottomWidth: 3,
          }}>
          {item.name}
        </Text>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: colors.semilightgrey,
              borderRadius: 20,
              padding: 5,
              width: 100,
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
          <Text
            style={{
              marginTop: 5,
              color: colors.active,
              fontFamily: 'SF-Pro-Rounded-Bold',
              fontSize: 22,
              width: width * 0.5 - 20,
            }}>
            {item.price}
          </Text>
        </View>
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
