import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DEFAULT_DASHBOARD_CHART_INIT, DashboardService, FilterDateParams } from 'stores';

const DASHBOARD_DAILY_CUSTOMER_KEY = 'dashboard-dailyCustomer';
export const useFetchDailyCustomer = (params: FilterDateParams) => {
  return useQuery({
    queryKey: [DASHBOARD_DAILY_CUSTOMER_KEY, dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      try {
        return DashboardService.instance.fetchDailyCustomer({ start: params.start, end: params.end });
      } catch (e) {
        console.error(e);
        return DEFAULT_DASHBOARD_CHART_INIT;
      }
    },
  });
};
