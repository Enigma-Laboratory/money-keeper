import {
  FindAllDailyOrderParams,
  FindAllDailyOrderResponse,
  FindAllDailyOrderRevenueParams,
  FindAllDailyUserParams,
  FindAllDailyUserResponse,
  FindAllOrderParams,
  FindAllOrderResponse,
} from '@enigma-laboratory/shared';
import { OrderApiService, UserApiService } from 'services';
import { FilterDateParams } from './interfaces';
import { dashboardStore } from './store';

export class DashboardService {
  public static _instance: DashboardService;

  public static get instance(): DashboardService {
    if (!DashboardService._instance) {
      this._instance = new DashboardService();
    }
    return this._instance;
  }

  public async fetchDailyOrder(params: FindAllDailyOrderParams): Promise<FindAllDailyOrderResponse> {
    const response = await OrderApiService.instance.fetchDailyOrder(params);

    return response;
  }

  public async fetchDailyRevenue(params: FindAllDailyOrderRevenueParams): Promise<FindAllDailyOrderResponse> {
    const response = await OrderApiService.instance.fetchDailyRevenue(params);

    return response;
  }

  public async fetchDailyCustomer(params: FindAllDailyUserParams): Promise<FindAllDailyUserResponse> {
    const response = await UserApiService.instance.fetchDailyCustomer(params);

    return response;
  }

  public async fetchOrderTimelineNext(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const response = await OrderApiService.instance.fetchAllOrder(params);
    const store = dashboardStore.getModel();
    const { orderTimeline } = store;

    const dataStack = [...orderTimeline.rows];
    dataStack.push(...response.rows);
    dashboardStore.updateModel({
      ...store,
      orderTimeline: {
        ...response,
        rows: dataStack,
      },
    });
    return response;
  }

  public async fetchRecentOrder(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const response = await OrderApiService.instance.fetchAllOrder(params);

    return response;
  }

  public setFilter(filter: FilterDateParams): void {
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      filter,
    });
  }
}
