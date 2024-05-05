import { NotFound } from 'components/NotFound';
import { Dashboard } from 'pages/dashboard';
import { OrderScreen } from 'pages/orders';
import { CreateOrderScreen } from 'pages/orders/createOrder';
import { OrderDetailScreen } from 'pages/orders/orderDetail';
import { EditOrderScreen } from 'pages/orders/orderDetail/editOrder';

const ROUTE_PATH = '/';

export interface RouteComponent {
  name: string;
  path: string;
  component: JSX.Element;
}

const getPath = (path: string): string => `${ROUTE_PATH}${path}`;

export const routePaths = {
  dashboard: getPath('/'),
  orders: getPath('/orders'),
  detailOrder: getPath('orders/detail/:id'),
  createOrder: getPath('orders/create'),
  editOrder: getPath('order/edit/:id'),
};

export const routeComponents: RouteComponent[] = [
  {
    name: 'dashboard',
    path: routePaths.dashboard,
    component: <Dashboard />,
  },
  {
    name: 'order',
    path: routePaths.orders,
    component: <OrderScreen />,
  },
  {
    name: 'order-create',
    path: routePaths.createOrder,
    component: (
      <CreateOrderScreen
        data={{
          isLoading: false,
          users: [],
          operationalSettings: [],
        }}
      />
    ),
  },
  {
    name: 'order-edit',
    path: routePaths.editOrder,
    component: <EditOrderScreen />,
  },
  {
    name: 'detail-order',
    path: routePaths.detailOrder,
    component: <OrderDetailScreen />,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: <NotFound />,
  },
];
