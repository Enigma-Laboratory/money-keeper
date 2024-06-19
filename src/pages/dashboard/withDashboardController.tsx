import { FindAllOrderResponse } from '@enigma-laboratory/shared';
import dayjs from 'dayjs';
import {
  useFetchDailyCustomer,
  useFetchDailyOrder,
  useFetchDailyRevenue,
  useFetchRecentOrder,
  useObservable,
  useWindowSize,
} from 'hooks';
import { ComponentType, useEffect, useState } from 'react';
import {
  DEFAULT_DASHBOARD_CHART_INIT,
  DEFAULT_DASHBOARD_RECENT_ORDER_INIT,
  DailyResponse,
  DashboardService,
  FilterDateParams,
  dashboardStore,
} from 'stores';
import { DEFAULT_PARAMS } from 'utils';

export interface DashboardProps {
  data: {
    dailyRevenue: DailyResponse;
    dailyOrder: DailyResponse;
    dailyCustomer: DailyResponse;
    recentOrder: FindAllOrderResponse & { page: number };
    orderTimeline: FindAllOrderResponse;
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

export const withDashboardController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { orderTimeline, filter, recentOrderPage } = useObservable(dashboardStore.model);
    const { data: dailyRevenue, isLoading: dailyRevenueLoading } = useFetchDailyRevenue(filter);
    const { data: dailyOrder, isLoading: dailyOrderLoading } = useFetchDailyOrder(filter);
    const { data: dailyCustomer, isLoading: dailyCustomerLoading } = useFetchDailyCustomer(filter);
    const {
      data: recentOrder,
      isLoading: recentOrderLoading,
      isPlaceholderData: recentOrderPlaceholder,
    } = useFetchRecentOrder({ page: recentOrderPage });
    const [loading, setLoading] = useState<Pick<LoadingTypes, 'orderTimeline' | 'recentOrder'>>(loadingInit);
    const { height } = useWindowSize();

    const fetchOrderTimelineNext = async () => {
      if (RECENT_ORDER_PAGE_INCREASE === 1) setLoading((prev) => ({ ...prev, orderTimeline: true }));
      try {
        await DashboardService.instance.fetchOrderTimelineNext({
          page: RECENT_ORDER_PAGE_INCREASE++,
          pageSize: height < 1000 ? DEFAULT_PARAMS.PAGE_SIZE : DEFAULT_PARAMS.PAGE_SIZE_TIME_LINE,
          sorters: DEFAULT_PARAMS.SORTERS,
        });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((prev) => ({ ...prev, orderTimeline: false }));
      }
    };

    const fetchRecentOrder = async () => {
      setLoading((prev) => ({ ...prev, recentOrder: true }));
      try {
        await DashboardService.instance.fetchRecentOrder({
          page: recentOrderPage,
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
      fetchOrderTimelineNext();
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
        recentOrder: recentOrderLoading || recentOrderPlaceholder,
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
