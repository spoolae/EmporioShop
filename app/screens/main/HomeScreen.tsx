import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {OfferCard} from '../../components/OfferCard';
import {Searchbar} from '../../components/SearchBar';
import {colors} from '../../constants/colors';

const cardlist = [
  {
    discount: '30%',
    name: "Today's special!",
    images: [
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398216_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398217_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398219_1000.jpg',
    ],
  },
];

export const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.background}>
      <Searchbar placeholder="Search" />
      <View style={styles.offers}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 25,
            color: 'black',
          }}>
          Special Offers
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Offers')}>
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
      <OfferCard
        discount={cardlist[0].discount}
        name={cardlist[0].name}
        images={cardlist[0].images}
      />
      <View style={styles.offers}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 25,
            color: 'black',
          }}>
          Most Popular
        </Text>
      </View>
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
    marginVertical: 20,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
