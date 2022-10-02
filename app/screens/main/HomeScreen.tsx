/* eslint-disable @typescript-eslint/no-explicit-any */
import {firebase} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {HomeSearchbar} from '../../components/HomeSearchBar';
import {OfferCard} from '../../components/OfferCard';
import {colors} from '../../constants/colors';
import {ClothingCategories} from './ClothingCategories';
import {MostPopular} from './MostPopular';

export interface StoreItemProps {
  id: number;
  categoryId: number;
  isSpecial: boolean;
  specialDiscount: string;
  specialName: string;
  oldPrice: string;
  isPopular: boolean;
  name: string;
  image: string;
  gallery: Array<string>;
  description: string;
  rating: string;
  price: string;
  sizes: Array<string>;
}

export interface CategoryProps {
  id: number;
  name: string;
  icon: string;
}

export const HomeScreen = () => {
  const [categories, setCategories] = useState<Array<CategoryProps>>([]);
  const [storeItems, setStoreItems] = useState<Array<StoreItemProps>>([]);
  const [offers, setOffers] = useState<Array<StoreItemProps>>([]);
  const [mostPopular, setMostPopular] = useState<Array<StoreItemProps>>([]);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    getCategories();
    getStoreItems();
  }, []);

  useEffect(() => {
    getOffers();
    getMostPopular();
  }, [storeItems]);

  const getCategories = async () => {
    const categories: Array<CategoryProps> = [];
    await firebase
      .firestore()
      .collection('categories')
      .orderBy('id')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(snapshot => {
          const temp: any = snapshot.data();
          categories.push(temp);
        });
      });
    setCategories(categories);
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

  const getOffers = () => {
    const offers = storeItems.filter(
      ({isSpecial}: StoreItemProps) => isSpecial === true,
    );
    setOffers(offers);
  };

  const getMostPopular = () => {
    const mostPoluar = storeItems.filter(
      ({isPopular}: StoreItemProps) => isPopular === true,
    );
    setMostPopular(mostPoluar);
  };

  return (
    <SafeAreaView style={styles.background}>
      <HomeSearchbar
        placeholder="Search"
        categories={categories}
        items={storeItems}
      />
      <View style={styles.offers}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 25,
            color: 'black',
          }}>
          Special Offers
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Offers', {offers: offers})}>
          <Text
            style={{
              fontFamily: 'URWGeometricArabic-Bold',
              fontSize: 20,
              color: colors.grey,
            }}>
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {offers.length > 0 ? (
        <OfferCard
          discount={offers[0].specialDiscount}
          name={offers[0].specialName}
          images={offers[0].gallery}
        />
      ) : null}

      <ScrollView
        style={{marginTop: 5}}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}>
        <View style={{marginTop: 25}}>
          <ClothingCategories categories={categories} items={storeItems} />
        </View>
        <View>
          <View style={styles.offers}>
            <Text
              style={{
                fontFamily: 'URWGeometricArabic-Bold',
                fontSize: 25,
                color: 'black',
              }}>
              Most Popular
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MostPopular', {
                  mostPopular: mostPopular,
                  categories: categories,
                })
              }>
              <Text
                style={{
                  fontFamily: 'URWGeometricArabic-Bold',
                  fontSize: 20,
                  color: colors.grey,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <MostPopular mostPopular={mostPopular} categories={categories} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  offers: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
