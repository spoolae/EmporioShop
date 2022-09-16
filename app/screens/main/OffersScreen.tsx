import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {OfferCard} from '../../components/OfferCard';
import {colors} from '../../constants/colors';

const cardlist = [
  {
    id: 1,
    discount: '30%',
    name: "Today's special!",
    images: [
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398216_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398217_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398219_1000.jpg',
    ],
  },
  {
    id: 2,
    discount: '15%',
    name: 'Sneakers week!',
    images: [
      'https://cdn-images.farfetch-contents.com/18/37/31/35/18373135_40975998_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/37/31/35/18373135_40978901_1000.jpg',
    ],
  },
  {
    id: 3,
    discount: '20%',
    name: 'Bag to School!',
    images: [
      'https://cdn-images.farfetch-contents.com/15/11/16/79/15111679_25677109_1000.jpg',
      'https://cdn-images.farfetch-contents.com/15/11/16/79/15111679_25677112_1000.jpg',
      'https://cdn-images.farfetch-contents.com/15/11/16/79/15111679_25677116_1000.jpg',
    ],
  },
  {
    id: 4,
    discount: '30%',
    name: "Today's special!",
    images: [
      'https://cdn-images.farfetch-contents.com/18/24/84/15/18248415_40953435_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/24/84/15/18248415_40954718_1000.jpg',
      'https://cdn-images.farfetch-contents.com/18/24/84/15/18248415_40954720_1000.jpg',
    ],
  },
];

interface CardListProps {
  id: number;
  discount: string;
  name: string;
  images: Array<string>;
}

export const OffersScreen = () => {
  let a;
  const getOffer = (cardlist: CardListProps) => (
    <View style={styles.offers}>
      <OfferCard
        key={cardlist.id}
        discount={cardlist.discount}
        name={cardlist.name}
        images={cardlist.images}
      />
    </View>
  );
  return (
    <SafeAreaView style={styles.background}>
      <BackHeader text={'Special Offers'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 15,
        }}>
        {cardlist.map((cardlist: CardListProps) => getOffer(cardlist))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  offers: {
    marginBottom: 20,
  },
});
