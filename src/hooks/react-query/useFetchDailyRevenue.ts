import dayjs from 'dayjs';
import { DashboardService, FilterDateParams } from 'stores';
import useQueryHook from './useBaseQuery';

const DASHBOARD_DAILY_REVENUE_KEY = ' dashboard-dailyRevenue';

export const useFetchDailyRevenue = ({ start, end }: FilterDateParams) => {
  const queryKey = [DASHBOARD_DAILY_REVENUE_KEY, dayjs(start).format('L'), dayjs(end).format('L')];

  const queryFunc = async () => {
    try {
      return await DashboardService.instance.fetchDailyRevenue({ start, end });
    } catch (error) {
      throw new Error('Failed to fetch daily revenue data');
    }
  };

  return useQueryHook(queryKey, queryFunc);
};
