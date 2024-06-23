import { FindAllOrderParams } from '@enigma-laboratory/shared';
import { DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE, DashboardService } from 'stores';
import { DEFAULT_PARAMS } from 'utils';
import useQueryHook from './useBaseQuery';

const DASHBOARD_RECENT_ORDER_KEY = 'dashboard-recentOrder';

export const useFetchRecentOrder = (params: FindAllOrderParams) => {
  const queryKey = [DASHBOARD_RECENT_ORDER_KEY, params.page];

  const queryFunc = async () => {
    try {
      return await DashboardService.instance.fetchRecentOrder({
        page: params.page,
        pageSize: DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE,
        sorters: DEFAULT_PARAMS.SORTERS,
      });
    } catch (error) {
      throw new Error('Failed to fetch recent order data');
    }
  };
  return useQueryHook(queryKey, queryFunc);
};
