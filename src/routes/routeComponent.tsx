import { NotFound } from 'components';
import dayjs from 'dayjs';
import {
  CreateOrderScreen,
  Dashboard,
  EditOrderScreen,
  OperationalSettingScreen,
  OrderDetailScreen,
  ProfileScreen,
} from 'pages';
import { DEFAULT_DASHBOARD_STORE_INIT } from 'stores';
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
    component: (
      <Dashboard
        data={{
          filter: { start: dayjs().toDate(), end: dayjs().toDate(), type: 'lastWeek' },
          dailyOrder: DEFAULT_DASHBOARD_STORE_INIT,
          dailyRevenue: DEFAULT_DASHBOARD_STORE_INIT,
          dailyCustomer: DEFAULT_DASHBOARD_STORE_INIT,
          recentOrder: { data: {}, count: 0, nextPage: false, prevPage: false, page: 1 },
          orderTimeline: { data: [], count: 0, nextPage: false, prevPage: false, page: 1 },
        }}
      />
    ),
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
    component: <ProfileScreen data={{ isLoading: false, user: { _id: '', name: '' } }} />,
  },
  {
    name: 'page-not-found',
    path: '*',
    component: <NotFound />,
  },
];
