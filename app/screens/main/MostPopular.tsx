import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  MostPopularCard,
  MostPopularCardEmpty,
  MostPopularCardProps,
} from '../../components/MostPopularCard';
import {colors} from '../../constants/colors';
import {CategoryProps, StoreItemProps} from './HomeScreen';

interface RenderCategoryProps {
  item: CategoryProps;
}

interface RenderItemProps {
  item: MostPopularCardProps;
}

interface MostPopularProps {
  mostPopular: Array<StoreItemProps>;
  categories: Array<CategoryProps>;
}

export const MostPopular = ({mostPopular, categories}: MostPopularProps) => {
  const [active, setActive] = useState(0);
  const ctgsRef = useRef<FlatList>(null);
  const itmsRef = useRef<FlatList>(null);

  useEffect(() => {
    if (mostPopular.length > 0) {
      ctgsRef.current?.scrollToIndex({index: active > 0 ? active - 1 : active});
    }
  }, [active]);

  const handleCategoryPress = (id: number) => {
    setActive(id);
    itmsRef.current?.scrollToIndex({index: 0, animated: true});
  };

  const renderCategory = ({item}: RenderCategoryProps) => (
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
    } else if (active === 6) {
      return item.isSpecial ? MostPopularCard(item) : null;
    } else {
      return item.categoryId === active ? MostPopularCard(item) : null;
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ctgsRef}
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
      <FlatList
        ref={itmsRef}
        data={mostPopular}
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
