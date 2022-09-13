import React, {useState} from 'react';
import {
  SafeAreaView,
  TextInput,
  ViewProps,
  TextInputProps,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';

interface SearchbarProps extends ViewProps {
  placeholder: string;
  value?: string;
}

export const Searchbar = ({
  style,
  ...props
}: SearchbarProps & TextInputProps) => {
  const [text, setText] = useState(props.value);
  return (
    <SafeAreaView>
      <View style={[styles.container, style]}>
        <Icon name="search" size={20} color={colors.grey} />
        <TextInput
          {...props}
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={props.placeholder}
        />
        <TouchableOpacity
          style={{position: 'absolute', right: 15}}
          onPress={() => setText('')}>
          <Icon name="close" size={20} color={colors.grey} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: colors.input,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    fontSize: 18,
    padding: 10,
    maxWidth: '70%',
    minWidth: '70%',
    fontFamily: 'URWGeometricArabic-Regular',
    color: colors.darkgrey,
  },
});
