import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {MostPopularCard} from '../../components/MostPopularCard';
import {OfferCard} from '../../components/OfferCard';
import {colors} from '../../constants/colors';
import {StoreItemProps} from './HomeScreen';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'Category'>;

export const CategoryScreen: React.FC<RouteProps> = ({route}) => {
  const {items, categoryId, categoryName} = route.params;

  const getOffer = (offers: StoreItemProps) => (
    <View style={styles.offers} key={offers.id}>
      <OfferCard
        discount={offers.specialDiscount}
        name={offers.specialName}
        images={offers.gallery}
      />
    </View>
  );

  const getCategoryItem = (item: StoreItemProps) => {
    if (categoryId === 6 && item.isSpecial) {
      return MostPopularCard(item);
    } else if (categoryId === item.categoryId) {
      return MostPopularCard(item);
    }
  };

  return (
    <SafeAreaView style={styles.background}>
      <BackHeader text={categoryName} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 15,
        }}>
        {items.map(getCategoryItem)}
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
