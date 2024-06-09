export const HttpConfig = {
  AUTH: 'auth',
  ORDERS: 'orders',
  PRODUCTS: 'products',
  USERS: 'users',
  OPERATIONAL_SETTINGS: 'operational-settings',
};

export const HttpConfigOrder = {
  UPDATE_ORDER_STATUS: 'order-status',
  UPDATE_ORDER_STATUSES: 'order-statuses',
  DAILY_ORDER: 'daily-order',
  DAILY_REVENUE: 'daily-revenue',
};

export const HttpConfigUser = {
  DAILY_USER: 'daily-user',
};

export const HttpConfigAuth = {
  REFRESH_TOKEN: 'refresh-token',
  SIGN_IN: 'sign-in',
  SIGN_UP: 'sign-up',
  SIGN_OUT: 'sign-out',
  FORGOT_PASSWORD: 'forgot-password',
};

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-type': 'application/json',
  'X-Requested-With': 'XMLHttpRequest',
};
