/* eslint-disable @typescript-eslint/no-explicit-any */
import {useLinkProps, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import {
  Animated,
  View,
  Image,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {RootStackParamList} from '../AppNavigator';
import {colors} from '../constants/colors';

const {width, height} = Dimensions.get('screen');

interface OfferCardProps {
  discount: string;
  name: string;
  images: Array<string>;
}

interface ScrollXProps {
  scrollX: Animated.Value;
}

export const OfferCard = (props: OfferCardProps) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: any) => (
    <View>
      <View style={styles.discount}>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 50,
            color: colors.background,
          }}>
          {props.discount}
        </Text>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 30,
            color: colors.background,
          }}>
          {props.name}
        </Text>
        <Text
          style={{
            fontFamily: 'URWGeometricArabic-Bold',
            fontSize: 20,
            color: colors.background,
          }}>
          Get discount for every order. Only valid for today
        </Text>
      </View>
      <View style={{backgroundColor: colors.active}}>
        <Image style={styles.image} source={{uri: item}} />
      </View>
    </View>
  );

  const Indicator = ({scrollX}: ScrollXProps) => (
    <View style={styles.indicatorContainer}>
      {props.images.map((_, i) => {
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

  return (
    <SafeAreaView
      style={{overflow: 'hidden', borderRadius: 15, backgroundColor: 'red'}}>
      <Animated.FlatList
        data={props.images}
        renderItem={renderItem}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  indicatorDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.background,
    marginHorizontal: 6,
  },
  label: {
    width,
    color: colors.active,
    fontSize: 32,
    textAlign: 'center',
    marginTop: 4,
    padding: 12,
    fontFamily: 'URWGeometricArabic-Bold',
  },
  image: {
    width: width - 40,
    height: 225,
    opacity: 0.7,
  },
  discount: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 50,
    paddingHorizontal: 20,
    zIndex: 1,
  },
});
