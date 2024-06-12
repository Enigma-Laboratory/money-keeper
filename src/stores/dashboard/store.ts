import { getDefaultParams } from 'pages/dashboard/withDashboardController';
import { BaseStore } from '../base-store';
import { DashboardState } from './interfaces';

export const DEFAULT_DASHBOARD_CHART_INIT = { data: [], total: 0, trend: 0 };
export const DEFAULT_DASHBOARD_RECENT_ORDER_INIT = { rows: [], count: 0, page: 1 };
export const DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE = 10;

const initialState: DashboardState = {
  recentOrderPage: 1,
  orderTimeline: DEFAULT_DASHBOARD_RECENT_ORDER_INIT,
  filter: getDefaultParams,
};

export const dashboardStore = new BaseStore<DashboardState>(initialState);
