import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../constants/colors';
import {sizes} from '../constants/sizes';

interface ScreenTabProps {
  key: string;
  icon: string;
  component: React.FC;
}

interface BottomNavigationProps {
  tabs: Array<ScreenTabProps>;
}

const {Navigator, Screen} = createBottomTabNavigator();

const screenOptions = {
  headerShown: false,
  tabBarInactiveBackgroundColor: colors.background,
  tabBarActiveTintColor: colors.active,
};

export const BottomNavigation = (props: BottomNavigationProps) => {
  const renderScreenTab = (item: ScreenTabProps) => {
    const tabBarIcon = (color: string) => (
      <Icon name={item.icon} color={color} size={sizes.defaultIcon} />
    );
    return (
      <Screen
        key={item.key}
        name={item.key}
        component={item.component}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({color}) => tabBarIcon(color),
        }}
      />
    );
  };

  return (
    <Navigator screenOptions={screenOptions}>
      {props.tabs.map(renderScreenTab)}
    </Navigator>
  );
};
