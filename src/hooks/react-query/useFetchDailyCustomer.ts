import { FindAllDailyUserResponse } from '@enigma-laboratory/shared';
import { UseQueryResult } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { DashboardService, FilterDateParams } from 'stores';
import useQueryHook from './useBaseQuery';

const DASHBOARD_DAILY_CUSTOMER_KEY = 'dashboard-dailyCustomer';

export const useFetchDailyCustomer = ({
  start,
  end,
}: FilterDateParams): UseQueryResult<FindAllDailyUserResponse, unknown> => {
  const queryKey = [DASHBOARD_DAILY_CUSTOMER_KEY, dayjs(start).format('L'), dayjs(end).format('L')];

  const queryFunc = async () => {
    try {
      return await DashboardService.instance.fetchDailyCustomer({ start, end });
    } catch (error) {
      throw new Error('Failed to fetch daily customer data');
    }
  };

  return useQueryHook(queryKey, queryFunc);
};
