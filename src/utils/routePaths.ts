import { ROUTE_PATH } from './constants';

const getPath = (path: string): string => `${ROUTE_PATH}${path}`;

export const routePaths = {
  dashboard: getPath(''),
  orders: getPath('orders'),
  detailOrder: getPath('orders/detail/:id'),
  createOrder: getPath('orders/create'),
  editOrder: getPath('orders/edit/:id'),
  profile: getPath('profile/:id'),
  customer: getPath('customer'),
  product: getPath('product'),
};
