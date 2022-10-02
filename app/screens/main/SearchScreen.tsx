import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
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
import {StoreItemProps} from './HomeScreen';

type RouteProps = NativeStackScreenProps<RootStackParamList, 'Search'>;

export const SearchScreen: React.FC<RouteProps> = ({route, navigation}) => {
  const {categories, items} = route.params;

  const getCategoryItem = (item: StoreItemProps) => {
    let a;
    return MostPopularCard(item, navigation);
  };

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
          Found 100 results
        </Text>
        <TouchableOpacity onPress={() => null}>
          <Icon name="filter" size={sizes.defaultIcon} color={colors.active} />
        </TouchableOpacity>
      </View>
      {/* Content */}
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
    paddingTop: 50,
  },
});
