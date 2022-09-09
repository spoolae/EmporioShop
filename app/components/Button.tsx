import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextProps,
  StyleSheet,
} from 'react-native';

import {colors} from '../constants/colors';

interface ButtonProps extends TextProps {
  title: string;
  variant?: 'contained' | 'text';
  containerStyle?: StyleProp<ViewStyle>;
}

export const Button: React.FC<ButtonProps> = ({...props}) => {
  const containedButton = (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      style={[styles.containedContainer, props.containerStyle]}>
      <Text style={[styles.containedButtonText, props.style]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
  const textButton = (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}
      style={[styles.textContainer, props.containerStyle]}>
      <Text style={[styles.buttonText, props.style]}>{props.title}</Text>
    </TouchableOpacity>
  );

  switch (props.variant) {
    case 'contained':
      return containedButton;
    case 'text':
      return textButton;
    default:
      return containedButton;
  }
};

const styles = StyleSheet.create({
  containedContainer: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 20,
    padding: 17,
    alignItems: 'center',
    backgroundColor: colors.active,
  },
  containedButtonText: {
    color: colors.background,
    fontSize: 16,
  },
  textContainer: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.active,
    fontSize: 16,
  },
});
