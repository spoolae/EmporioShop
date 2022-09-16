import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';

interface BackHeaderProps {
  text?: string;
}

export const BackHeader = (props: BackHeaderProps) => {
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
      <Text style={styles.text}>{props.text}</Text>
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
  text: {
    fontFamily: 'URWGeometricArabic-Bold',
    fontSize: 25,
    color: colors.active,
    paddingHorizontal: 10,
  },
});
