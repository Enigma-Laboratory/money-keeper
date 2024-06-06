import { BaseStore } from '../base-store';
import { DashboardState } from './interfaces';

const initialState: DashboardState = {
  dailyOrder: { data: [], total: 0, trend: 0 },
  dailyRevenue: { data: [], total: 0, trend: 0 },
  dailyCustomer: { data: [], total: 0, trend: 0 },
  recentOrder: { data: {}, count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
  orderTimeline: { data: [], count: 0, page: 1, pageSize: 10, prevPage: false, nextPage: false },
};

export const dashboardStore = new BaseStore<DashboardState>(initialState);
