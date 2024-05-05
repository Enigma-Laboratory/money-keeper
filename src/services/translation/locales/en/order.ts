/* eslint-disable import/no-anonymous-default-export */

import { CreateOrderSteps } from 'pages/orders/createOrder/CreateOrder';

const { INFORMATION, PRODUCT, CONFIRM, DONE } = CreateOrderSteps;

export default {
  form: {
    group: {
      title: 'Group Name',
      message: 'Please input your Group!',
    },
    buyer: {
      title: 'Buyer',
      message: 'Please input your Group!',
    },
    order: {
      title: 'Order Name',
      message: 'Please input your order name!',
    },
    createdOrderAt: {
      title: 'Created Order at',
      message: 'Please input your created order at',
    },
    product: {
      name: 'Name',
      userIds: 'UserIds',
      price: 'Price',
      messageRequiredName: 'Missing product name',
      messageRequiredUserIds: 'Missing userIds',
      messageRequiredPrice: 'Missing price',
    },
    addProduct: 'Add Product',
    groupName: 'Group name',
    orders: 'Order',
    customers: 'Customer',
    products: 'Products',
    categories: 'Categories',
    logout: 'Logout',
  },
  createOrderStep: {
    [INFORMATION]: 'Information',
    [PRODUCT]: 'Product',
    [CONFIRM]: 'Confirm',
    [DONE]: 'Done',
  },
};
