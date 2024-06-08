import { BaseStore } from '../base-store';
import { DashboardState } from './interfaces';

export const DEFAULT_DASHBOARD_STORE_INIT = { data: [], total: 0, trend: 0 };

const initialState: DashboardState = {
  dailyOrder: DEFAULT_DASHBOARD_STORE_INIT,
  dailyRevenue: DEFAULT_DASHBOARD_STORE_INIT,
  dailyCustomer: DEFAULT_DASHBOARD_STORE_INIT,
  recentOrder: { data: {}, count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
  orderTimeline: { data: [], count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
  filter: 'lastWeek',
};

export const dashboardStore = new BaseStore<DashboardState>(initialState);
