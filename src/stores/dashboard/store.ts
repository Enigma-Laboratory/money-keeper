import { getDefaultParams } from 'pages/dashboard/withDashboardController';
import { BaseStore } from '../base-store';
import { DashboardState } from './interfaces';

export const DEFAULT_DASHBOARD_STORE_INIT = { data: [], total: 0, trend: 0 };

const initialState: DashboardState = {
  recentOrder: { data: {}, count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
  orderTimeline: { data: [], count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
  filter: getDefaultParams,
};

export const dashboardStore = new BaseStore<DashboardState>(initialState);
