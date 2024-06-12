import { FindAllOrderParams } from '@enigma-laboratory/shared';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE, DashboardService } from 'stores';

export const useFetchRecentOrder = (params: FindAllOrderParams) => {
  return useQuery({
    queryKey: ['dashboard-recentOrder', params.page],
    queryFn: () => {
      return DashboardService.instance.fetchRecentOrder({
        page: params.page,
        pageSize: DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE,
      });
    },
  });
};
