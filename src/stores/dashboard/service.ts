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
    return await OrderApiService.instance.fetchDailyOrder(params);
  }

  public async fetchDailyRevenue(params: FindAllDailyOrderRevenueParams): Promise<FindAllDailyOrderResponse> {
    return await OrderApiService.instance.fetchDailyRevenue(params);
  }

  public async fetchDailyCustomer(params: FindAllDailyUserParams): Promise<FindAllDailyUserResponse> {
    return await UserApiService.instance.fetchDailyCustomer(params);
  }

  public async fetchOrderTimelineNext(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const order = await OrderApiService.instance.fetchAllOrder(params);
    const store = dashboardStore.getModel();
    const { orderTimeline } = store;

    const dataStack = [...orderTimeline.rows];
    dataStack.push(...order.rows);
    dashboardStore.updateModel({
      ...store,
      orderTimeline: {
        ...order,
        rows: dataStack,
      },
    });
    return order;
  }

  public async fetchRecentOrder(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    return await OrderApiService.instance.fetchAllOrder(params);
  }

  public setFilter(filter: FilterDateParams): void {
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      filter,
    });
  }
}
