import dayjs from 'dayjs';
import { useObservable } from 'hooks';
import { ComponentType, useEffect, useState } from 'react';
import { DailyResponse, DashboardService, DateFilter, OrderTimeline, RecentOrder, dashboardStore } from 'stores';
import { DEFAULT_PARAMS } from 'utils';
import { useFetchDailyCustomer, useFetchDailyOrder, useFetchDailyRevenue } from '../../stores/dashboard/service-hooks';

export interface DashboardProps {
  data: {
    dailyRevenue: DailyResponse;
    dailyOrder: DailyResponse;
    dailyCustomer: DailyResponse;
    recentOrder: RecentOrder;
    orderTimeline: OrderTimeline;
    filter?: DateFilter;
  };
  loading?: LoadingTypes;
  dispatch?: {
    fetchOrderTimelineNext: () => Promise<void>;
    fetchRecentOrder: (page: number, pageSize?: number) => Promise<void>;
    fetchChartData: (filter: DailyParams) => Promise<void>;
  };
}

export type DailyParams = {
  start: Date;
  end: Date;
};

type LoadingTypes = {
  dailyRevenue: boolean;
  dailyOrder: boolean;
  dailyCustomer: boolean;
  recentOrder: boolean;
  orderTimeline: boolean;
};

const getDefaultParams: DailyParams = {
  start: new Date(dayjs().subtract(6, 'd').format()),
  end: new Date(dayjs().format()),
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
    const { orderTimeline, recentOrder, filter } = useObservable(
      dashboardStore.model,
    );
    const [loading, setLoading] = useState<LoadingTypes>(loadingInit);
    const [params, setParams] = useState<DailyParams>(roundDate(getDefaultParams));

    const { data: _dailyOrder, isLoading: isLoadingDailyOrder } = useFetchDailyOrder(params);
    const { data: _dailyRevenue, isLoading: isLoadingDailyRevenue } = useFetchDailyRevenue(params);
    const { data: _dailyCustomer, isLoading: isLoadingDailyCustomer } = useFetchDailyCustomer(params);

    const reFetchChartData = async (params: DailyParams): Promise<void> => {
      setParams(roundDate(params));
    };

    const fetchTableData = async (): Promise<void> => {
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
    };

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
      // fetchChartData(getDefaultParams);
      fetchTableData();
    }, []);

    const logicProps: DashboardProps = {
      data: {
        dailyOrder: _dailyOrder!,
        dailyRevenue: _dailyRevenue!,
        dailyCustomer: _dailyCustomer!,
        recentOrder,
        orderTimeline,
        filter,
      },
      loading: {
        ...loading,
        dailyOrder: isLoadingDailyOrder,
        dailyCustomer: isLoadingDailyCustomer,
        dailyRevenue: isLoadingDailyRevenue,
      },
      dispatch: {
        fetchOrderTimelineNext,
        fetchRecentOrder,
        fetchChartData: reFetchChartData,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
