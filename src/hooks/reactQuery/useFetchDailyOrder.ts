import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DashboardService, FilterDateParams } from 'stores';

export const useFetchDailyOrder = (params: FilterDateParams) => {
  return useQuery({
    queryKey: ['dashboard-dailyOrder', dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      return DashboardService.instance.fetchDailyOrder({ start: params.start, end: params.end });
    },
  });
};
