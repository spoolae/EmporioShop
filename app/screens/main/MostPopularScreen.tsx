import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {BackHeader} from '../../components/BackHeader';
import {
  MostPopularCard,
  MostPopularCardEmpty,
} from '../../components/MostPopularCard';
import {colors} from '../../constants/colors';
import {CategoryProps, StoreItemProps} from './HomeScreen';

interface RenderCategoryProps {
  item: CategoryProps;
}

interface RenderItemProps {
  item: StoreItemProps;
}

type RouteProps = NativeStackScreenProps<RootStackParamList, 'MostPopular'>;

export const MostPopularScreen: React.FC<RouteProps> = ({
  route,
  navigation,
}) => {
  const {mostPopular, categories} = route.params;
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
      return MostPopularCard(item, navigation);
    } else {
      return item.categoryId === active
        ? MostPopularCard(item, navigation)
        : null;
    }
  };
  return (
    <SafeAreaView style={styles.background}>
      <BackHeader text={'Most Popular'} />
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 15,
        }}
        style={{marginTop: 15}}
        ListEmptyComponent={() => <MostPopularCardEmpty />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    height: '100%',
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
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
