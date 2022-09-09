/* eslint-disable @typescript-eslint/no-explicit-any */
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';
import {Button} from '../../components/Button';
import {colors} from '../../constants/colors';

interface FoodSliderProps {
  items: Array<{
    image: Array<string>;
    label: Array<string>;
  }>;
}

interface RenderItemProps {
  image: string;
  label: string;
}

interface ScrollXProps {
  scrollX: Animated.Value;
}

const {width, height} = Dimensions.get('screen');

const items = [
  {
    image:
      'https://assets.vogue.com/photos/61e04e5160d4727d5bae2e0d/master/w_2560%2Cc_limit/adidas%2520for%2520Prada%2520Re-Nylon_11.jpg',
    label: 'We provide high quality products just for you',
  },
  {
    image:
      'https://wwd.com/wp-content/uploads/2022/01/PR-Prada_Adidas_Look_Book_shot_1.jpg',
    label: 'Your satisfaction is our number one priority',
  },
  {
    image: 'https://tuixachhanghieu.com/wp-content/uploads/2022/01/2x2_DT.jpg',
    label: "Let's fulfill your daily needs with Emporio right now!",
  },
];

export const OnBoardingScreen = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderItem = ({item}: any) => (
    <View>
      <Image style={styles.image} source={{uri: item.image}} />
      <Text style={styles.label}>{item.label}</Text>
    </View>
  );

  const Indicator = ({scrollX}: ScrollXProps) => (
    <View style={styles.indicatorContainer}>
      {items.map((_, i) => {
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
    <SafeAreaView style={{backgroundColor: colors.background, height: '100%'}}>
      <Animated.FlatList
        data={items}
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
      <Button
        title="Get Started"
        containerStyle={styles.button}
        style={{fontFamily: 'URWGeometricArabic-Regular', fontSize: 18}}
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  indicatorContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  indicatorDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: colors.active,
    marginVertical: 10,
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
    width: width,
    height: height * 0.6,
  },
  button: {
    width: '85%',
    marginTop: 30,
    margin: 20,
  },
});
