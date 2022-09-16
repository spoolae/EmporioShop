/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-children-prop */
import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {colors} from '../constants/colors';

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontFamily: 'SF-Pro-Rounded-Regular',
  },
  tabBarStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarIndicatorStyle: {
    backgroundColor: colors.active,
    height: 3,
    borderRadius: 10,
  },
  tabBarIndicatorContainerStyle: {height: '104%'},
  swipeEnabled: false,
  tabBarPressColor: colors.transparent,
  tabBarActiveTintColor: colors.active,
  tabBarInactiveTintColor: colors.grey,
  tabBarScrollEnabled: true,
  tabBarItemStyle: {width: 100},
};

export const ClothingCategories = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    const apiURL = 'https://rn-delivery-api.herokuapp.com/api/categories';
    const res = await fetch(apiURL);
    const json = await res.json();
    const convertResJsonData = json.data.map((data: any) => ({
      id: data.id,
      name: data.attributes.name,
    }));
    setData(convertResJsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  const {Navigator, Screen} = createMaterialTopTabNavigator();

  const Content = (id: number) => null;

  const Categories = () => (
    <Navigator screenOptions={screenOptions}>
      {data.map(data => (
        <Screen
          key={data.id}
          name={data.name}
          children={() => Content(data.id)}
        />
      ))}
    </Navigator>
  );

  return data.length > 0 ? Categories() : null;
};
