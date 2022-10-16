/* eslint-disable @typescript-eslint/no-explicit-any */
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../AppNavigator';
import {MostPopularCard} from '../../components/MostPopularCard';
import {SearchBar} from '../../components/SearchBar';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';
import {CategoryProps, StoreItemProps} from './HomeScreen';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {Button} from '../../components/Button';
import {sortBy} from '../../constants/sortBy';

const {width} = Dimensions.get('screen');

type RouteProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

interface RenderCategoryProps {
  item: CategoryProps;
}

export const SearchScreen: React.FC<RouteProps> = ({route, navigation}) => {
  const {categories, items} = route.params;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResCount, setSearchResCount] = useState(0);
  const [maxPriceRange, setMaxPriceRange] = useState([
    Math.min(...items.map(item => item.price)),
    Math.max(...items.map(item => item.price)),
  ]);

  const [isFiltersActive, setIsFiltersActive] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeSortCategory, setActiveSortCategory] = useState(0);
  const [priceRange, setPriceRange] = useState([
    maxPriceRange[0],
    maxPriceRange[1],
  ]);

  const bottomSheet = useRef<any>(null);

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getCategoryItem = (item: StoreItemProps) =>
    item ? MostPopularCard(item, navigation) : null;

  const getSortedData = items
    .map(item => {
      if (
        isFiltersActive &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        if (item.price >= priceRange[0] && item.price <= priceRange[1]) {
          if (activeCategory === 0) {
            return item;
          }
          if (activeCategory === 6 && item.isSpecial) {
            return item;
          } else if (item.categoryId === activeCategory) {
            return item;
          } else {
            return null;
          }
        } else {
          return null;
        }
      } else if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return item;
      } else {
        return null;
      }
    })
    .sort((a: any, b: any) => {
      if (a && b) {
        switch (activeSortCategory) {
          case 1: {
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (b.name.toLowerCase() > a.name.toLowerCase()) {
              return 1;
            }
            return 0;
          }
          case 2:
            return a.price - b.price;
          case 3:
            return b.price - a.price;
          default:
            return a.id - b.id;
        }
      }
    });

  useEffect(() => {
    setSearchResCount(getSortedData.filter(Boolean).length);
  }, [getSortedData]);

  const renderCategory = ({item}: RenderCategoryProps) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => setActiveCategory(item.id)}
      key={item.id}
      style={{marginRight: 15}}>
      <Text
        style={[
          styles.category,
          activeCategory === item.id ? styles.activeCategory : null,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderSortCategory = ({id, name}) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => setActiveSortCategory(id)}
      key={id}
      style={{marginRight: 15}}>
      <Text
        style={[
          styles.category,
          activeSortCategory === id ? styles.activeCategory : null,
        ]}>
        {name}
      </Text>
    </TouchableOpacity>
  );

  const SliderMarker = (isLeft: boolean) => (
    <View>
      <View
        style={{
          backgroundColor: colors.active,
          width: 25,
          height: 25,
          borderRadius: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            borderRadius: 100,
            padding: 7,
          }}
        />
      </View>
      <Text
        style={{
          position: 'absolute',
          top: 30,
          fontFamily: 'URWGeometricArabic-Bold',
          fontSize: 18,
          color: colors.active,
          transform: [isLeft ? {translateX: 5} : {translateX: -15}],
        }}>
        {isLeft ? priceRange[0] : priceRange[1]}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.background}>
      {/* SearchBar */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            borderRadius: 10,
            backgroundColor: colors.input,
            padding: 12,
          }}>
          <Icon
            name="chevron-back"
            size={sizes.defaultIcon}
            color={colors.grey}
          />
        </TouchableOpacity>
        <View>
          <SearchBar
            placeholder={'Search'}
            categories={categories}
            items={items}
            updateSearchQuery={updateSearchQuery}
          />
        </View>
      </View>
      {/* SearchResults */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 18,
          marginBottom: 12,
        }}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 22,
            color: colors.grey,
          }}>
          Found {searchResCount} results
        </Text>
        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          <Icon
            name="filter"
            size={sizes.defaultIcon}
            color={isFiltersActive ? colors.active : colors.grey}
          />
        </TouchableOpacity>
      </View>
      {/* Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 15,
        }}>
        {getSortedData.map(getCategoryItem)}
      </ScrollView>
      {/* BottomSheet */}
      <BottomSheet hasDraggableIcon radius={25} ref={bottomSheet} height={600}>
        <View style={{paddingHorizontal: 20, paddingTop: 25}}>
          <Text
            style={{
              fontFamily: 'URWGeometricArabic-Bold',
              fontSize: 28,
              color: colors.active,
              textAlign: 'center',
            }}>
            {'Sort & Filter'}
          </Text>
          {/* Categories */}
          <View>
            <Text
              style={{
                fontFamily: 'URWGeometricArabic-Bold',
                fontSize: 20,
                color: colors.active,
                marginTop: 25,
                marginBottom: 15,
              }}>
              Categories
            </Text>
            <FlatList
              data={categories}
              renderItem={renderCategory}
              keyExtractor={(item, index) => index.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
          {/* PriceRange */}
          <Text
            style={{
              fontFamily: 'URWGeometricArabic-Bold',
              fontSize: 20,
              color: colors.active,
              marginTop: 25,
              marginBottom: 15,
            }}>
            Price Range
          </Text>
          <MultiSlider
            values={[priceRange[0], priceRange[1]]}
            min={maxPriceRange[0]}
            max={maxPriceRange[1]}
            onValuesChange={setPriceRange}
            minMarkerOverlapDistance={75}
            snapped
            step={50}
            sliderLength={width - 40}
            isMarkersSeparated
            customMarkerLeft={() => SliderMarker(true)}
            customMarkerRight={() => SliderMarker(false)}
            selectedStyle={{
              backgroundColor: colors.active,
              height: 6,
              bottom: 3,
            }}
            unselectedStyle={{
              backgroundColor: 'lightgrey',
              height: 4,
              bottom: 2,
              borderRadius: 2,
            }}
            markerContainerStyle={{
              width: 55,
            }}
          />
          {/* SortBy */}
          <Text
            style={{
              fontFamily: 'URWGeometricArabic-Bold',
              fontSize: 20,
              color: colors.active,
              marginVertical: 15,
              marginTop: 25,
              marginBottom: 15,
            }}>
            Sort By
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sortBy.map(renderSortCategory)}
          </ScrollView>
        </View>
        {/* Buttons */}
        <View
          style={{
            marginHorizontal: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 55,
            borderTopWidth: 3,
            paddingTop: 25,
            borderColor: colors.input,
          }}>
          <Button
            title={'Reset'}
            containerStyle={{
              width: '30%',
              backgroundColor: colors.transparent,
              borderWidth: 3,
            }}
            style={{color: colors.active}}
            onPress={() => {
              bottomSheet.current.close();
              setIsFiltersActive(false);
            }}
          />
          <Button
            title={'Apply'}
            containerStyle={{width: '65%'}}
            onPress={() => {
              bottomSheet.current.close();
              setIsFiltersActive(true);
            }}
          />
        </View>
      </BottomSheet>
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
});
