import {
  FindAllDailyOrderParams,
} from '@enigma-laboratory/shared';
import { OrderApiService, UserApiService } from 'services';
import { DailyResponse } from './interfaces';
import { useQuery } from '@tanstack/react-query';
import { DEFAULT_DASHBOARD_STORE_INIT } from './store';

export const useFetchDailyOrder = (params: FindAllDailyOrderParams) => {
  return useQuery<DailyResponse>({
    initialData: DEFAULT_DASHBOARD_STORE_INIT,
    queryKey: ['DailyOrder', params],
    queryFn: () => OrderApiService.instance.fetchDailyOrder(params),
  });
};

export const useFetchDailyRevenue = (params: FindAllDailyOrderParams) => {
  return useQuery<DailyResponse>({
    initialData: DEFAULT_DASHBOARD_STORE_INIT,
    queryKey: ['DailyRevenue', params],
    queryFn: () => OrderApiService.instance.fetchDailyRevenue(params),
  });
};

export const useFetchDailyCustomer = (params: FindAllDailyOrderParams) => {
  return useQuery<DailyResponse>({
    initialData: DEFAULT_DASHBOARD_STORE_INIT,
    queryKey: ['DailyCustomer', params],
    queryFn: () => UserApiService.instance.fetchDailyCustomer(params),
  });
};
