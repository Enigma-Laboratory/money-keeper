import { NotFound } from 'components';
import {
  CreateOrderScreen,
  Dashboard,
  EditOrderScreen,
  OperationalSettingScreen,
  OrderDetailScreen,
  ProfileScreen,
} from 'pages';
import { routePaths } from 'utils';

export interface RouteComponent {
  name: string;
  path: string;
  component: JSX.Element;
}

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
      <OperationalSettingScreen
        data={{
          isLoading: false,
          statusLoading: {
            id: '',
            status: false,
          },
          operationalSettings: {},
          groupOrders: {},
          users: {},
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
    name: 'profile',
    path: routePaths.profile,
    component: <ProfileScreen data={{ isLoading: false, user: { _id: '', name: '', email: '', password: '' } }} />,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: <NotFound />,
  },
];
