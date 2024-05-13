import { NotFound } from 'components';
import { CreateOrderScreen, Dashboard, EditOrderScreen, OrderDetailScreen, OrderScreen } from 'pages';
import { ROUTE_PATH } from 'utils';

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
    component: (
      <OrderScreen
        data={{
          isLoading: false,
          statusLoading: {
            id: '',
            status: false,
          },
          operationalSettings: {},
          groupOrders: {},
        }}
        dispatch={{
          handleOnCloseModal: () => {},
          handleUpdateOrderStatus: async (): Promise<void> => {
            await Promise.resolve();
          },
        }}
      />
    ),
  },
  {
    name: 'order-create',
    path: routePaths.createOrder,
    component: <CreateOrderScreen />,
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
