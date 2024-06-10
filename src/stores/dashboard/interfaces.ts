import { FindAllDailyOrderResponse, FindAllParams, Order } from '@enigma-laboratory/shared';

export interface ChartUnit {
  date: Date;
  value: number;
}

export type DateFilter = 'lastWeek' | 'lastMonth' | 'custom';

export interface RecentOrder extends FindAllParams {
  data: Record<number, Order[]>;
  count: number;
  nextPage: boolean;
  prevPage: boolean;
  page: number;
}

export interface OrderTimeline extends FindAllParams {
  data: Order[];
  count: number;
  nextPage: boolean;
  prevPage: boolean;
  page: number;
}

export interface DailyResponse extends Pick<FindAllDailyOrderResponse, 'total' | 'trend'> {
  data: ChartUnit[];
}

export type DashboardState = {
  dailyRevenue: DailyResponse;
  dailyOrder: DailyResponse;
  dailyCustomer: DailyResponse;
  recentOrder: RecentOrder;
  orderTimeline: OrderTimeline;
  filter: DateFilter;
};
