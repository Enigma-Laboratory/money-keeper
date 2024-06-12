import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DEFAULT_DASHBOARD_STORE_INIT, DashboardService, FilterDateParams } from 'stores';

export const useFetchNewCustomer = (params: FilterDateParams) => {
  console.log(dayjs(params.start).format('L'));
  return useQuery({
    queryKey: ['dashboard-dailyCustomer', dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      return DashboardService.instance.fetchDailyCustomer({ start: params.start, end: params.end });
    },
    placeholderData: DEFAULT_DASHBOARD_STORE_INIT,
  });
};
