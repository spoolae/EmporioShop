import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, TouchableOpacity, StyleSheet} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';

export const BackHeader = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.background}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon
          name="chevron-back"
          size={sizes.defaultIcon}
          color={colors.black}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    marginVertical: 35,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    marginLeft: 15,
    maxWidth: '80%',
    fontSize: 18,
  },
});
