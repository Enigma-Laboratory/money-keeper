import dayjs from 'dayjs';
import { useObservable } from 'hooks';
import { ComponentType, useEffect, useState } from 'react';
import { DailyResponse, DashboardService, OrderTimeline, RecentOrder, dashboardStore } from 'stores/dashboard';

export interface DashboardProps {
  data: {
    dailyRevenue: DailyResponse;
    dailyOrder: DailyResponse;
    dailyCustomer: DailyResponse;
    recentOrder: RecentOrder;
    orderTimeline: OrderTimeline;
  };
  loading?: {
    recentOrder: boolean;
    orderTimeline: boolean;
  };
  dispatch?: {
    fetchOrderTimelineNext: () => Promise<void>;
    fetchRecentOrder: (page: number, pageSize?: number) => Promise<void>;
  };
}

type LoadingTypes = {
  recentOrder: boolean;
  orderTimeline: boolean;
};

export const withDashboardController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    // const [isLoading] = useState<boolean>(true);
    const { dailyOrder, dailyRevenue, dailyCustomer, orderTimeline, recentOrder } = useObservable(dashboardStore.model);
    const [loading, setLoading] = useState<LoadingTypes>({ recentOrder: false, orderTimeline: false });

    const fetchDaily = async () => {
      try {
        Promise.all([
          await DashboardService.instance.fetchDailyOrder({
            start: new Date(dayjs().subtract(6, 'd').format()),
            end: new Date(dayjs().format()),
          }),
          await DashboardService.instance.fetchDailyRevenue({
            start: new Date(dayjs().subtract(6, 'd').format()),
            end: new Date(dayjs().format()),
          }),
          await DashboardService.instance.fetchDailyCustomer({
            start: new Date(dayjs().subtract(6, 'd').format()),
            end: new Date(dayjs().format()),
          }),
          await DashboardService.instance.fetchBothRecentOrderAndOrderTimeline({ page: 1, pageSize: 10 }),
        ]);
      } catch (e) {
        console.error(e);
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
          new Promise((resolve) => resolve(() => {}));
        } else await DashboardService.instance.fetchRecentOrder({ page, pageSize: 10 });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading((prev) => ({ ...prev, recentOrder: false }));
      }
    };

    useEffect(() => {
      fetchDaily();
    }, []);

    const logicProps: DashboardProps = {
      data: {
        dailyOrder,
        dailyRevenue,
        dailyCustomer,
        recentOrder,
        orderTimeline,
      },
      loading,
      dispatch: {
        fetchOrderTimelineNext,
        fetchRecentOrder,
      },
    };

    return <Component {...props} {...logicProps} />;
  };
};
