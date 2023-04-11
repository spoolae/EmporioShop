/* eslint-disable react/prop-types */
import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {connect} from 'react-redux';
import {Button} from '../components/Button';
import {getCategoriesAction} from './categoriesSlice';

const ReduxTestScreen = props => {
  const getCategories = () => {
    props.dispatch(getCategoriesAction());
  };

  console.log(props);

  return (
    <SafeAreaView style={{padding: 25}}>
      <Button title={'GET CATEGORIES'} onPress={getCategories} />
      {props.categories.map(item => (
        <Text
          style={{
            fontSize: 24,
            margin: 20,
            color: 'black',
            textAlign: 'center',
          }}
          key={item.id}>
          {item.name}
        </Text>
      ))}
    </SafeAreaView>
  );
};

const mapStateToProps = (state, props) => ({categories: state.categories});
export default connect(mapStateToProps)(ReduxTestScreen);
