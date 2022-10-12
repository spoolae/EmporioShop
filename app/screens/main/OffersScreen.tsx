import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {OfferCard} from '../../components/OfferCard';
import {colors} from '../../constants/colors';
import {StoreItemProps} from './HomeScreen';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'Offers'>;

export const OffersScreen: React.FC<RouteProps> = ({route}) => {
  const {offers} = route.params;

  const getOffer = (offers: StoreItemProps) => (
    <View style={styles.offers} key={offers.id}>
      <OfferCard
        discount={offers.specialDiscount}
        name={offers.specialName}
        images={offers.gallery}
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
        {offers.map(getOffer)}
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
