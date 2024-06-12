import { FindAllDailyOrderResponse, FindAllParams, Order } from '@enigma-laboratory/shared';

export interface ChartUnit {
  date: Date;
  value: number;
}

export type DateFilterType = 'lastWeek' | 'lastMonth' | 'custom';

export type FilterDateParams = {
  start: Date;
  end: Date;
  type: DateFilterType;
};

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

export interface DailyResponse extends FindAllDailyOrderResponse {}

export type DashboardState = {
  recentOrder: RecentOrder;
  orderTimeline: OrderTimeline;
  filter: FilterDateParams;
};
