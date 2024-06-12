import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DashboardService, FilterDateParams } from 'stores';

export const useFetchDailyCustomer = (params: FilterDateParams) => {
  return useQuery({
    queryKey: ['dashboard-dailyCustomer', dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      return DashboardService.instance.fetchDailyCustomer({ start: params.start, end: params.end });
    },
  });
};
