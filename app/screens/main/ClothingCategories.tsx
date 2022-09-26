import React from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../constants/colors';
import {CategoryProps} from './HomeScreen';

interface ClothingCategoriesProps {
  categories: Array<CategoryProps>;
}

const {width} = Dimensions.get('screen');

export const ClothingCategories = ({categories}: ClothingCategoriesProps) => {
  const renderCategory = (category: CategoryProps) =>
    category.id > 0 ? (
      <View key={category.id}>
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={{uri: category.icon}} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.name}>{category.name}</Text>
      </View>
    ) : null;
  return (
    <View style={styles.background}>{categories.map(renderCategory)}</View>
  );
};

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  categoryContainer: {},
  iconContainer: {
    width: width * 0.18,
    height: width * 0.18,
    marginHorizontal: 20,
    marginBottom: 10,
    aspectRatio: 1,
    backgroundColor: colors.lightgrey,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: '40%',
    width: '40%',
    opacity: 0.85,
  },
  name: {
    fontFamily: 'URWGeometricArabic-Regular',
    fontSize: 17,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
});
