import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DashboardService, FilterDateParams } from 'stores';

export const useFetchDailyRevenue = (params: FilterDateParams) => {
  return useQuery({
    queryKey: ['dashboard-dailyRevenue', dayjs(params.start).format('L'), dayjs(params.end).format('L')],
    queryFn: () => {
      return DashboardService.instance.fetchDailyRevenue({ start: params.start, end: params.end });
    },
  });
};
