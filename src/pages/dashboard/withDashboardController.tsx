import dayjs from 'dayjs';
import { useObservable } from 'hooks';
import { ComponentType, useEffect, useState } from 'react';
import { DailyResponse, DashboardService, DateFilter, OrderTimeline, RecentOrder, dashboardStore } from 'stores';
import { DEFAULT_PARAMS } from 'utils';

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
    fetchDaily: (filter: DailyParams) => Promise<void>;
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

const getDefaultParams = {
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

export const withDashboardController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const { dailyOrder, dailyRevenue, dailyCustomer, orderTimeline, recentOrder, filter } = useObservable(
      dashboardStore.model,
    );
    const [loading, setLoading] = useState<LoadingTypes>(loadingInit);

    const fetchDailyChart = async (params: DailyParams): Promise<void> => {
      setLoading((prev) => ({ ...prev, dailyCustomer: true, dailyOrder: true, dailyRevenue: true }));
      try {
        Promise.all([
          await DashboardService.instance.fetchDailyOrder(params),
          await DashboardService.instance.fetchDailyRevenue(params),
          await DashboardService.instance.fetchDailyCustomer(params),
        ]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((prev) => ({ ...prev, dailyCustomer: false, dailyOrder: false, dailyRevenue: false }));
      }
    };

    const fetchOrder = async (): Promise<void> => {
      setLoading((prev) => ({ ...prev, orderTimeline: true, recentOrder: true }));
      try {
        await DashboardService.instance.fetchBothRecentOrderAndOrderTimeline({
          page: DEFAULT_PARAMS.PAGE,
          pageSize: DEFAULT_PARAMS.PAGE_SIZE,
        });
      } catch (e) {
      } finally {
        setLoading((prev) => ({ ...prev, orderTimeline: false, recentOrder: false }));
      }
    };

    const fetchOrderTimelineNext = async () => {
      try {
        await DashboardService.instance.fetchOrderTimelineNext({ page: 1, pageSize: 10 });
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
        } else await DashboardService.instance.fetchRecentOrder({ page, pageSize: 10 });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((prev) => ({ ...prev, recentOrder: false }));
      }
    };

    useEffect(() => {
      fetchDailyChart(getDefaultParams);
      fetchOrder();
    }, []);

    const logicProps: DashboardProps = {
      data: {
        dailyOrder,
        dailyRevenue,
        dailyCustomer,
        recentOrder,
        orderTimeline,
        filter,
      },
      loading,
      dispatch: {
        fetchOrderTimelineNext,
        fetchRecentOrder,
        fetchDaily: fetchDailyChart,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
