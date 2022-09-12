/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput as NativeTextInput,
  TextInputProps as NativeTextInputProps,
  View,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as EmailValidator from 'email-validator';

import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';

interface TextInputProps extends NativeTextInputProps {
  placeholder: string;
  value?: string;
  updateLoginValue: (query: any) => void;
}

export const LoginInput = ({style, ...props}: TextInputProps) => {
  const [text, setText] = useState(props.value || '');
  const [borderColor, setBorderColor] = useState(colors.darkgrey);
  const [isValid, setIsValid] = useState(false);
  const transformOpacity = useRef(new Animated.Value(1)).current;

  const onFocus = () => {
    setBorderColor('black');
    Animated.timing(transformOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  };

  const onBlur = () => {
    if (EmailValidator.validate(text)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }

    if (isValid) {
      setBorderColor(colors.darkgrey);
    } else {
      setBorderColor(colors.error);
    }

    if (text === '' || text === undefined || text === null) {
      Animated.timing(transformOpacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleOnChangeText = (query: any) => {
    props.updateLoginValue(query);
    setText(query);
  };

  return (
    <SafeAreaView>
      <View style={[styles.container, style, {borderBottomColor: borderColor}]}>
        <Icon
          name="mail-outline"
          size={sizes.inputIcon}
          color={colors.darkgrey}
        />
        <Animated.Text
          style={[styles.placeholder, {opacity: transformOpacity}]}>
          {props.placeholder}
        </Animated.Text>
        <NativeTextInput
          {...props}
          style={styles.input}
          value={text}
          onChangeText={handleOnChangeText}
          placeholder={''}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          keyboardType={'email-address'}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    paddingTop: 5,
  },
  placeholder: {
    fontSize: 20,
    position: 'absolute',
    left: 20,
    marginHorizontal: 15,
    top: 20,
    fontFamily: 'URWGeometricArabic-Regular',
  },
  input: {
    fontSize: 20,
    lineHeight: 20,
    color: colors.active,
    paddingTop: 18,
    paddingHorizontal: 15,
    flex: 1,
    fontFamily: 'URWGeometricArabic-Regular',
  },
});
