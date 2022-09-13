import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Searchbar} from '../../components/SearchBar';
import {colors} from '../../constants/colors';

// const cardlist = [
//   {
//     discount: '30%',
//     name: "Today's special!",
//     images: [
//       'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398217_1000.jpg',
//       'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398216_1000.jpg',
//       'https://cdn-images.farfetch-contents.com/18/98/21/34/18982134_41398216_1000.jpg',
//     ],
//   },
// ];

export const HomeScreen = () => (
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
      <TouchableOpacity>
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
  </SafeAreaView>
);

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  offers: {
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
});
