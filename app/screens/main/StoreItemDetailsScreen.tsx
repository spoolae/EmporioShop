/* eslint-disable react/prop-types */
import {useNavigation} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStackParamList} from '../../AppNavigator';
import {colors} from '../../constants/colors';
import {sizes} from '../../constants/sizes';

type RouteProps = NativeStackScreenProps<
  RootStackParamList,
  'StoreItemDetails'
>;

interface RenderImageProps {
  item: string;
}

interface ScrollXProps {
  scrollX: Animated.Value;
}

const {width, height} = Dimensions.get('screen');

export const StoreItemDetailsScreen: React.FC<RouteProps> = ({route}) => {
  const {item} = route.params;

  const [currentSize, setCurrentSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(item.price);

  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const price = parseInt(item.price, 10);
    const currency = item.price.match(/[a-zA-Z]+/g);
    setTotalPrice(price * quantity + ' ' + String(currency));
  }, [quantity]);

  const renderImage = ({item}: RenderImageProps) => (
    <Image style={styles.image} source={{uri: item}} />
  );
  const Indicator = ({scrollX}: ScrollXProps) => (
    <View style={styles.indicatorContainer}>
      {item.gallery.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [12, 36, 12],
          extrapolate: 'clamp',
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.4, 1, 0.4],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={i}
            style={[styles.indicatorDot, {width: dotWidth, opacity}]}
          />
        );
      })}
    </View>
  );

  const getSizes = (sizes: Array<string>) =>
    sizes.map((sizes, i) => (
      <TouchableOpacity
        key={i}
        activeOpacity={0.5}
        onPress={() => setCurrentSize(i)}>
        <View
          style={
            i === currentSize
              ? styles.activeSizeButtonContainer
              : styles.sizeButtonContainer
          }>
          <Text
            style={
              i === currentSize ? styles.activeSizeButton : styles.sizeButton
            }>
            {sizes}
          </Text>
        </View>
      </TouchableOpacity>
    ));

  const Quantity = () => (
    <View
      style={{
        backgroundColor: colors.semilightgrey,
        borderRadius: 20,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 15,
      }}>
      <TouchableOpacity
        onPress={() => (quantity > 1 ? setQuantity(quantity - 1) : null)}>
        <Icon name="remove" size={sizes.defaultIcon} color={colors.black} />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'URWGeometricArabic-Regular',
          fontSize: 24,
          color: colors.active,
          paddingHorizontal: 15,
        }}>
        {quantity}
      </Text>
      <TouchableOpacity
        onPress={() => (quantity < 9 ? setQuantity(quantity + 1) : null)}>
        <Icon name="add" size={sizes.defaultIcon} color={colors.black} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{height: '100%', backgroundColor: colors.background}}>
      {/* CAROUSEL */}
      <View>
        <Animated.FlatList
          data={item.gallery}
          renderItem={renderImage}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={32}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {useNativeDriver: false},
          )}
        />
        <Indicator scrollX={scrollX} />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: 'absolute',
            left: 15,
            top: 35,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            borderRadius: 15,
            padding: 5,
          }}>
          <Icon
            name="chevron-back"
            size={sizes.defaultIcon}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      {/* CONTENT */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 15}}
        style={{marginTop: 10}}>
        <View style={styles.content}>
          {/* TITLE */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontFamily: 'URWGeometricArabic-Bold',
                fontSize: 30,
                color: colors.active,
                width: '85%',
              }}>
              {item.name}
            </Text>
            <TouchableOpacity>
              <Icon
                name="heart-outline"
                size={sizes.defaultIcon}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: colors.lightgrey,
                borderRadius: 15,
                width: 100,
                padding: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="star" size={20} color={colors.darkgrey} />
              <Text
                style={{
                  color: colors.darkgrey,
                  fontFamily: 'SF-Pro-Rounded-Bold',
                  fontSize: 18,
                  top: 2,
                  marginLeft: 10,
                }}>
                {item.rating}
              </Text>
            </View>
            <View>
              {item.isSpecial ? (
                <Text
                  style={{
                    color: colors.darkgrey,
                    fontFamily: 'SF-Pro-Rounded-Regular',
                    fontSize: 18,
                    marginLeft: 10,
                    backgroundColor: colors.lightgrey,
                    borderRadius: 15,
                    width: 100,
                    lineHeight: 36,
                    padding: 5,
                    textAlign: 'center',
                  }}>
                  Special
                </Text>
              ) : null}
            </View>
            <View>
              {item.isPopular ? (
                <Text
                  style={{
                    color: colors.darkgrey,
                    fontFamily: 'SF-Pro-Rounded-Regular',
                    fontSize: 18,
                    marginLeft: 10,
                    backgroundColor: colors.lightgrey,
                    borderRadius: 15,
                    width: 100,
                    lineHeight: 36,
                    padding: 5,
                    justifyContent: 'center',
                    textAlign: 'center',
                  }}>
                  Popular
                </Text>
              ) : null}
            </View>
          </View>

          {/* DESCRIPTION */}
          <View
            style={{
              borderTopWidth: 3,
              borderBottomWidth: 3,
              borderColor: colors.semilightgrey,
              paddingTop: 5,
              paddingBottom: 15,
              marginVertical: 22,
            }}>
            <Text
              style={{
                color: colors.active,
                fontFamily: 'SF-Pro-Rounded-Bold',
                fontSize: 24,
              }}>
              Description
            </Text>
            <Text
              style={{
                color: colors.grey,
                fontFamily: 'SF-Pro-Rounded-Regular',
                fontSize: 20,
              }}>
              {item.description}
            </Text>
            <Text
              style={{
                marginTop: 10,
                color: colors.active,
                fontFamily: 'SF-Pro-Rounded-Bold',
                fontSize: 24,
              }}>
              Size
            </Text>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {item.sizes ? (
                  getSizes(item.sizes)
                ) : (
                  <Text
                    style={{
                      color: colors.active,
                      fontFamily: 'SF-Pro-Rounded-Regular',
                      fontSize: 22,
                    }}>
                    Availiable in one size
                  </Text>
                )}
              </ScrollView>
            </View>
            {/* QUANTITY */}
            <View
              style={{
                flexDirection: 'row',
                marginTop: 25,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: colors.active,
                  fontFamily: 'SF-Pro-Rounded-Bold',
                  fontSize: 24,
                }}>
                Quantity
              </Text>
              <Quantity />
            </View>
          </View>
          {/* PRICE */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text
                style={{
                  color: colors.grey,
                  fontFamily: 'SF-Pro-Rounded-Regular',
                  fontSize: 18,
                }}>
                Total price
              </Text>
              <Text
                style={{
                  color: colors.active,
                  fontFamily: 'SF-Pro-Rounded-Bold',
                  fontSize: 24,
                }}>
                {totalPrice}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: colors.active,
                paddingHorizontal: 15,
                paddingVertical: 10,
              }}>
              <Icon
                name="basket"
                size={sizes.defaultIcon}
                color={colors.background}
              />
              <Text
                style={{
                  color: colors.background,
                  fontFamily: 'SF-Pro-Rounded-Regular',
                  fontSize: 20,
                  paddingLeft: 10,
                }}>
                Add to Cart
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    backgroundColor: ' rgba(0, 0, 0, 0.15)',
    alignSelf: 'center',
    borderRadius: 15,
  },
  indicatorDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    marginVertical: 10,
    marginHorizontal: 6,
  },
  image: {
    width: width,
    height: height * 0.45,
  },
  content: {
    paddingHorizontal: 15,
    marginTop: 25,
  },
  sizeButton: {
    color: colors.active,
    fontFamily: 'SF-Pro-Rounded-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  activeSizeButton: {
    color: colors.background,
    fontFamily: 'SF-Pro-Rounded-Bold',
    fontSize: 20,
    textAlign: 'center',
  },
  sizeButtonContainer: {
    borderColor: colors.active,
    borderRadius: 55,
    borderWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
    minWidth: 58,
    alignContent: 'center',
    marginRight: 15,
  },
  activeSizeButtonContainer: {
    backgroundColor: colors.active,
    borderRadius: 55,
    borderWidth: 3,
    paddingVertical: 5,
    paddingHorizontal: 15,
    minWidth: 58,
    alignContent: 'center',
    marginRight: 15,
  },
});
