/* eslint-disable import/no-anonymous-default-export */

import { OrderStatus } from '@enigma-laboratory/shared';

const { CANCELLED, CONFIRM, DONE, PROCESSING } = OrderStatus;

export default {
  sidebar: {
    dashboard: 'Dashboard',
    orders: 'Order',
    customers: 'Customer',
    products: 'Products',
    categories: 'Categories',
    profile: 'Profile',
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
    [PROCESSING]: 'Processing',
  },
  alertTitle: {
    info: 'Info',
    confirm: 'Confirm',
    error: 'Error',
    warning: 'Warning',
    success: 'Success',
    close: 'Close',
    ok: 'Ok',
  },
};
