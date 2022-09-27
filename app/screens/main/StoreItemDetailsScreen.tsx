import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {RootStackParamList} from '../../AppNavigator';

type RouteProps = NativeStackScreenProps<
  RootStackParamList,
  'StoreItemDetails'
>;

export const StoreItemDetailsScreen: React.FC<RouteProps> = ({route}) => {
  const {item} = route.params;

  return (
    <SafeAreaView>
      <Text>12343241</Text>
    </SafeAreaView>
  );
};
