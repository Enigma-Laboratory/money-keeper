import dayjs from 'dayjs';
import { useFetchDailyCustomer, useFetchDailyOrder, useFetchDailyRevenue, useObservable } from 'hooks';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import {
  DEFAULT_DASHBOARD_STORE_INIT,
  DailyResponse,
  DashboardService,
  FilterDateParams,
  OrderTimeline,
  RecentOrder,
  dashboardStore,
} from 'stores';
import { DEFAULT_PARAMS } from 'utils';

export interface DashboardProps {
  data: {
    dailyRevenue: DailyResponse;
    dailyOrder: DailyResponse;
    dailyCustomer: DailyResponse;
    recentOrder: RecentOrder;
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

export const withDashboardController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { orderTimeline, recentOrder, filter } = useObservable(dashboardStore.model);
    const { data: dailyRevenue, isLoading: dailyRevenueLoading } = useFetchDailyRevenue(filter);
    const { data: dailyOrder, isLoading: dailyOrderLoading } = useFetchDailyOrder(filter);
    const { data: dailyCustomer, isLoading: dailyCustomerLoading } = useFetchDailyCustomer(filter);
    console.log(dailyRevenueLoading, dailyOrderLoading, dailyCustomerLoading);
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
        if (recentOrder.data[page]) {
          dashboardStore.updateModel({
            ...dashboardStore.getModel(),
            recentOrder: { ...recentOrder, page: page },
          });
        } else
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
        dailyOrder: dailyOrder || DEFAULT_DASHBOARD_STORE_INIT,
        dailyRevenue: dailyRevenue || DEFAULT_DASHBOARD_STORE_INIT,
        dailyCustomer: dailyCustomer || DEFAULT_DASHBOARD_STORE_INIT,
        recentOrder,
        orderTimeline,
        filter,
      },
      loading: {
        ...loading,
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
