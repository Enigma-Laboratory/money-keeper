import { FindAllDailyOrderResponse, FindAllParams, Order } from '@enigma-laboratory/shared';

export interface ChartUnit {
  date: Date;
  value: number;
}

export interface RecentOrder extends Omit<FindAllParams, 'page'>, Required<Pick<FindAllParams, 'page'>> {
  data: Record<number, Order[]>;
  count: number;
  nextPage: boolean;
  prevPage: boolean;
}

export interface OrderTimeline extends Omit<FindAllParams, 'page'>, Required<Pick<FindAllParams, 'page'>> {
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
};
