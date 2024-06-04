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
    lang: 'English',
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
  alert: {
    closeBtn: 'Close',
    okBtn: 'Ok',
    deleteBtn: 'Delete',
    title: {
      info: 'Info',
      confirm: 'Confirm',
      error: 'Error',
      warning: 'Warning',
      success: 'Success',
      delete: 'Warning',
    },
  },
  orderNotification: {
    create: {
      successMessage: 'Order created successfully',
      successDescription: 'The order with {{orderName}} has been created.',
    },
    delete: {
      successMessage: 'Order deleted successfully',
      successDescription: 'The order with {{orderName}} has been deleted.',
    },
    update: {
      successMessage: 'Order updated successfully',
      successDescription: 'The order with {{orderName}} has been updated.',
    },
  },
};
