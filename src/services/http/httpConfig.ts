export const HttpConfig = {
  AUTH: 'auth',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  ORDER_DETAILS: 'order-details',
  USERS: 'users',
  OPERATIONAL_SETTINGS: 'operational-settings',
};

export const HttpConfigOrder = {
  GET_ONE_ORDER: 'get-one-order',
  CREATE_ORDER: 'create-order',
  DELETE_ORDER: 'delete-order',
  UPDATE_ORDER: 'update-order',
  UPDATE_ORDER_STATUS: 'order-status',
};

export const HttpConfigAuth = {
  REFRESH_TOKEN: 'refresh-token',
  GET_ONE_USER: 'get-one-user',
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  SIGN_OUT: 'sign-out',
  UPDATE_USER: 'update-user',
  DELETE_USER: 'delete-user',
};

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
