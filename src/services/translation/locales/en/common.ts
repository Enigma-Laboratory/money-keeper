/* eslint-disable import/no-anonymous-default-export */

import { OrderStatus } from 'components/OrderStatus';

const { CANCELLED, CONFIRM, DONE, PENDING, PROCESSING } = OrderStatus;

export default {
  sidebar: {
    dashboard: 'Dashboard',
    orders: 'Order',
    customers: 'Customer',
    products: 'Products',
    categories: 'Categories',
    logout: 'Logout',
  },
  language: {
    title: 'Language',
    en: 'English',
    vi: 'Vietnamese',
  },
  mode: {
    title: 'Mode',
    light: 'Light',
    dark: 'Dark',
  },
  settings: 'Settings',
  orderStatus: {
    [CANCELLED]: 'Cancelled',
    [CONFIRM]: 'Confirm',
    [DONE]: 'Done',
    [PENDING]: 'Pending',
    [PROCESSING]: 'Processing',
  },
};
