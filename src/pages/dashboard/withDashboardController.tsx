import { FindAllOrderResponse } from '@enigma-laboratory/shared';
import dayjs from 'dayjs';
import {
  useFetchDailyCustomer,
  useFetchDailyOrder,
  useFetchDailyRevenue,
  useFetchRecentOrder,
  useObservable,
} from 'hooks';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_DASHBOARD_CHART_INIT,
  DEFAULT_DASHBOARD_RECENT_ORDER_INIT,
  DailyResponse,
  DashboardService,
  FilterDateParams,
  OrderTimeline,
  dashboardStore,
} from 'stores';
import { DEFAULT_PARAMS } from 'utils';

export interface DashboardProps {
  data: {
    dailyRevenue: DailyResponse;
    dailyOrder: DailyResponse;
    dailyCustomer: DailyResponse;
    recentOrder: FindAllOrderResponse & { page: number };
    orderTimeline: OrderTimeline;
    filter: FilterDateParams;
  };
  loading?: LoadingTypes;
  dispatch?: {
    fetchOrderTimelineNext: () => Promise<void>;
    fetchRecentOrder: (page: number, pageSize?: number) => Promise<void>;
  };
}

type LoadingTypes = {
  dailyRevenue: boolean;
  dailyOrder: boolean;
  dailyCustomer: boolean;
  recentOrder: boolean;
  orderTimeline: boolean;
};

export const getDefaultParams: FilterDateParams = {
  start: new Date(dayjs().subtract(6, 'd').format()),
  end: new Date(dayjs().format()),
  type: 'lastWeek',
};

export const loadingInit = {
  recentOrder: false,
  orderTimeline: false,
  dailyCustomer: false,
  dailyOrder: false,
  dailyRevenue: false,
};

let RECENT_ORDER_PAGE_INCREASE = 1;
let ORDER_TIMELINE_PAGE_INCREASE = 1;

const roundDate = (params: DailyParams):DailyParams => {
  params.start.setHours(0,0,0,0);
  params.end.setHours(23, 59, 59, 999);
  return params
}

export const withDashboardController = <P, >(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { orderTimeline, filter, recentOrderPage } = useObservable(dashboardStore.model);
    const { data: dailyRevenue, isLoading: dailyRevenueLoading } = useFetchDailyRevenue(filter);
    const { data: dailyOrder, isLoading: dailyOrderLoading } = useFetchDailyOrder(filter);
    const { data: dailyCustomer, isLoading: dailyCustomerLoading } = useFetchDailyCustomer(filter);
    const { data: recentOrder, isLoading: recentOrderLoading } = useFetchRecentOrder({ page: recentOrderPage });
    const [loading, setLoading] = useState<Pick<LoadingTypes, 'orderTimeline' | 'recentOrder'>>(loadingInit);

    const fetchTableData = useCallback(async (): Promise<void> => {
      setLoading((prev) => ({ ...prev, orderTimeline: true, recentOrder: true }));
      try {
        await DashboardService.instance.fetchBothRecentOrderAndOrderTimeline({
          page: DEFAULT_PARAMS.PAGE,
          pageSize: DEFAULT_PARAMS.PAGE_SIZE,
          sorters: DEFAULT_PARAMS.SORTERS,
        });
      } catch (e) {
        console.error(e);
      } finally {
        RECENT_ORDER_PAGE_INCREASE++;
        ORDER_TIMELINE_PAGE_INCREASE++;
        setLoading((prev) => ({ ...prev, orderTimeline: false, recentOrder: false }));
      }
    }, []);

    const fetchOrderTimelineNext = async () => {
      try {
        await DashboardService.instance.fetchOrderTimelineNext({
          page: RECENT_ORDER_PAGE_INCREASE++,
          pageSize: DEFAULT_PARAMS.PAGE_SIZE,
          sorters: DEFAULT_PARAMS.SORTERS,
        });
      } catch (e) {
        console.error(e);
      }
    };

    const fetchRecentOrder = async (page: number) => {
      setLoading((prev) => ({ ...prev, recentOrder: true }));
      try {
        // if (recentOrder.data[page]) {
        //   dashboardStore.updateModel({
        //     ...dashboardStore.getModel(),
        //   });
        // } else
        await DashboardService.instance.fetchRecentOrder({
          page: ORDER_TIMELINE_PAGE_INCREASE++,
          pageSize: DEFAULT_PARAMS.PAGE_SIZE,
          sorters: DEFAULT_PARAMS.SORTERS,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((prev) => ({ ...prev, recentOrder: false }));
      }
    };

    useEffect(() => {
      fetchTableData();
    }, []);

    const logicProps: DashboardProps = {
      data: {
        dailyOrder: dailyOrder || DEFAULT_DASHBOARD_CHART_INIT,
        dailyRevenue: dailyRevenue || DEFAULT_DASHBOARD_CHART_INIT,
        dailyCustomer: dailyCustomer || DEFAULT_DASHBOARD_CHART_INIT,
        recentOrder: { ...(recentOrder || DEFAULT_DASHBOARD_RECENT_ORDER_INIT), page: recentOrderPage },
        orderTimeline,
        filter,
      },
      loading: {
        ...loading,
        recentOrder: recentOrderLoading,
        dailyCustomer: dailyCustomerLoading,
        dailyRevenue: dailyRevenueLoading,
        dailyOrder: dailyOrderLoading,
      },
      dispatch: {
        fetchOrderTimelineNext,
        fetchRecentOrder,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
