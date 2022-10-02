import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
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
import {RootStackParamList} from '../AppNavigator';
import {colors} from '../constants/colors';
import {CategoryProps, StoreItemProps} from '../screens/main/HomeScreen';

interface HomeSearchbarProps extends ViewProps {
  placeholder: string;
  value?: string;
  categories: Array<CategoryProps>;
  items: Array<StoreItemProps>;
}

export const HomeSearchbar = ({
  style,
  ...props
}: HomeSearchbarProps & TextInputProps) => {
  const [text, setText] = useState(props.value);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
          onFocus={() =>
            navigation.navigate('Search', {
              categories: props.categories,
              items: props.items,
            })
          }
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
