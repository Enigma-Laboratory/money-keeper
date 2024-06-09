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
import { DailyResponse, DateFilter } from './interfaces';
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
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      dailyOrder: response as DailyResponse,
    });
    return response;
  }

  public async fetchDailyRevenue(params: FindAllDailyOrderRevenueParams): Promise<FindAllDailyOrderResponse> {
    const response = await OrderApiService.instance.fetchDailyRevenue(params);
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      dailyRevenue: response as DailyResponse,
    });
    return response;
  }

  public async fetchDailyCustomer(params: FindAllDailyUserParams): Promise<FindAllDailyUserResponse> {
    const response = await UserApiService.instance.fetchDailyCustomer(params);
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      dailyCustomer: response as DailyResponse,
    });
    return response;
  }

  public async fetchBothRecentOrderAndOrderTimeline(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const response = await OrderApiService.instance.fetchAllOrder(params);
    const store = dashboardStore.getModel();
    const { recentOrder, orderTimeline } = store;

    dashboardStore.updateModel({
      ...store,
      recentOrder: {
        ...store.recentOrder,
        count: response.count,
        data: { 1: response.rows },
        page: recentOrder.page,
        pageSize: recentOrder.pageSize,
      },
      orderTimeline: {
        ...store.orderTimeline,
        count: response.count,
        data: response.rows,
        page: orderTimeline.page,
        pageSize: orderTimeline.pageSize,
        prevPage: false,
        nextPage: response.count !== response.rows.length,
      },
    });
    return response;
  }

  public async fetchOrderTimelineNext(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const store = dashboardStore.getModel();
    const { orderTimeline } = store;
    const response = await OrderApiService.instance.fetchAllOrder({ ...params, page: orderTimeline.page + 1 });

    const dataStack = [...store.orderTimeline.data];
    dataStack.push(...response.rows);

    dashboardStore.updateModel({
      ...store,
      orderTimeline: {
        ...orderTimeline,
        page: orderTimeline.page + 1,
        data: dataStack,
        nextPage: dataStack.length !== response.count,
      },
    });
    return response;
  }

  public async fetchRecentOrder(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const response = await OrderApiService.instance.fetchAllOrder(params);
    const store = dashboardStore.getModel();
    const { recentOrder } = store;

    dashboardStore.updateModel({
      ...store,
      recentOrder: {
        ...recentOrder,
        page: params.page as number,
        data: { ...recentOrder.data, [params.page as number]: response.rows },
        count: response.count,
      },
    });

    return response;
  }

  public setFilter(filter: DateFilter): void {
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      filter,
    });
  }
}
