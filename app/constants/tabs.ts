import { CartScreen } from '../screens/main/CartScreen';
import { HomeScreen } from './../screens/main/HomeScreen';

export const tabs = [
  {
    key: 'home',
    icon: 'home-sharp',
    component: HomeScreen,
  },
  {
    key: 'cart',
    icon: 'cart-sharp',
    component: CartScreen,
  },
];
