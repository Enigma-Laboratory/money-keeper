import { FindAllDailyOrderResponse, FindAllOrderResponse, FindAllParams, Order } from '@enigma-laboratory/shared';

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

export interface OrderTimeline extends FindAllParams {
  data: Order[];
  count: number;
  nextPage: boolean;
  prevPage: boolean;
  page: number;
}

export interface DailyResponse extends FindAllDailyOrderResponse {}

export type DashboardState = {
  recentOrderPage: number;
  orderTimeline: FindAllOrderResponse;
  filter: FilterDateParams;
};
