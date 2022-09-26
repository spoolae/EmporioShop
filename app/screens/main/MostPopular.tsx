/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MostPopularCard,
  MostPopularCardEmpty,
  MostPopularCardProps,
} from '../../components/MostPopularCard';
import {colors} from '../../constants/colors';

const mostpopular = [
  {
    id: 0,
    name: 'All',
  },
  {
    id: 1,
    name: 'Clothes',
  },
  {
    id: 2,
    name: 'Shoes',
  },
  {
    id: 3,
    name: 'Bags',
  },
  {
    id: 4,
    name: 'Accessories',
  },
  {
    id: 5,
    name: 'Jewellery',
  },
  {
    id: 6,
    name: 'Sale',
  },
];

const popularclothing = [
  {
    id: 1,
    categoryId: 1,
    name: 'Stone Island Jacket',
    image:
      'https://cdn-images.farfetch-contents.com/18/43/72/18/18437218_40109365_1000.jpg',
    rating: '4.8',
    price: '2800.00 PLN',
  },
  {
    id: 2,
    categoryId: 2,
    name: 'Nike Air Force 1',
    image:
      'https://cdn-images.farfetch-contents.com/18/97/82/14/18978214_41269362_1000.jpg',
    rating: '4.2',
    price: '560.00 PLN',
  },
  {
    id: 3,
    categoryId: 2,
    name: 'Nike x Ambush Air Adjust',
    image:
      'https://cdn-images.farfetch-contents.com/19/03/73/54/19037354_41499322_1000.jpg',
    rating: '4.6',
    price: '820.00 PLN',
  },
  {
    id: 4,
    categoryId: 3,
    name: 'Maison Margiela Bag',
    image:
      'https://cdn-images.farfetch-contents.com/18/43/90/76/18439076_41563986_1000.jpg',
    rating: '4.7',
    price: '2450.00 PLN',
  },
  {
    id: 5,
    categoryId: 4,
    name: 'Burberry Belt',
    image:
      'https://cdn-images.farfetch-contents.com/18/24/85/69/18248569_39171130_1000.jpg',
    rating: '4.6',
    price: '820.00 PLN',
  },
  {
    id: 6,
    categoryId: 5,
    name: 'Luis Morais Ring',
    image:
      'https://cdn-images.farfetch-contents.com/17/84/50/08/17845008_38365014_1000.jpg',
    rating: '4.1',
    price: '400.00 PLN',
  },
  {
    id: 7,
    categoryId: 6,
    name: 'Prada Milano Jumper',
    image:
      'https://cdn-images.farfetch-contents.com/18/80/69/31/18806931_40970416_1000.jpg',
    rating: '4.6',
    price: '820.00 PLN',
  },
];

interface RenderItemProps {
  item: MostPopularCardProps;
}

export const MostPopular = () => {
  const [active, setActive] = useState(1);
  const ctgsRef = useRef<FlatList>(null);
  const itmsRef = useRef<FlatList>(null);

  useEffect(() => {
    ctgsRef.current?.scrollToIndex({index: active > 0 ? active - 1 : active});
  }, [active]);

  const handleCategoryPress = (id: number) => {
    setActive(id);
    itmsRef.current?.scrollToIndex({index: 0, animated: true});
  };

  const renderCategory = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => handleCategoryPress(item.id)}
      key={item.id}
      style={{marginRight: 15}}>
      <Text
        style={[
          styles.category,
          active === item.id ? styles.activeCategory : null,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderItem = ({item}: RenderItemProps) => {
    if (active === 0) {
      return MostPopularCard(item);
    } else {
      return item.categoryId === active ? MostPopularCard(item) : null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ctgsRef}
        data={mostpopular}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        ref={itmsRef}
        data={popularclothing}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        contentContainerStyle={{paddingTop: 25, paddingBottom: 100}}
        ListEmptyComponent={() => <MostPopularCardEmpty />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  category: {
    fontSize: 18,
    paddingHorizontal: 18,
    paddingVertical: 6,
    textAlign: 'center',
    color: colors.active,
    fontFamily: 'SF-Pro-Rounded-Regular',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: colors.active,
  },
  activeCategory: {
    color: colors.background,
    backgroundColor: colors.active,
  },
  footer: {
    margin: 10,
  },
  flatlist: {
    minWidth: '100%',
  },
});
