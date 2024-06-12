import { FindAllOrderParams } from '@enigma-laboratory/shared';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE, DashboardService } from 'stores';
import { DEFAULT_PARAMS } from 'utils';

const DASHBOARD_RECENT_ORDER_KEY = 'dashboard-recentOrder';

export const useFetchRecentOrder = (params: FindAllOrderParams) => {
  return useQuery({
    queryKey: [DASHBOARD_RECENT_ORDER_KEY, params.page],
    queryFn: async () => {
      try {
        return await DashboardService.instance.fetchRecentOrder({
          page: params.page,
          pageSize: DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE,
          sorters: DEFAULT_PARAMS.SORTERS,
        });
      } catch (e) {
        console.error(e);
      }
    },
    placeholderData: keepPreviousData,

  });
};
