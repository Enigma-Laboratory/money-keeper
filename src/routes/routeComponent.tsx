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
import { GroupsSettingScreen } from 'pages/groups';
import { DEFAULT_DASHBOARD_CHART_INIT, DEFAULT_DASHBOARD_RECENT_ORDER_INIT } from 'stores';
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
          dailyOrder: DEFAULT_DASHBOARD_CHART_INIT,
          dailyRevenue: DEFAULT_DASHBOARD_CHART_INIT,
          dailyCustomer: DEFAULT_DASHBOARD_CHART_INIT,
          recentOrder: DEFAULT_DASHBOARD_RECENT_ORDER_INIT,
          orderTimeline: {
            rows: DEFAULT_DASHBOARD_RECENT_ORDER_INIT.rows,
            count: DEFAULT_DASHBOARD_RECENT_ORDER_INIT.count,
          },
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
    name: 'groups',
    path: routePaths.groups,
    component: (
      <GroupsSettingScreen
        data={{
          isLoading: false,
          groups: {},
          users: {},
          statusLoading: {
            id: '',
            status: false,
          },
        }}
      />
    ),
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
