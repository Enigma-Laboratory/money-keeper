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
    const order = await OrderApiService.instance.fetchDailyOrder(params);
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      dailyOrder: order as DailyResponse,
    });
    return order;
  }

  public async fetchDailyRevenue(params: FindAllDailyOrderRevenueParams): Promise<FindAllDailyOrderResponse> {
    const order = await OrderApiService.instance.fetchDailyRevenue(params);
    const dashboard = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...dashboard,
      dailyRevenue: order as DailyResponse,
    });
    return order;
  }

  public async fetchDailyCustomer(params: FindAllDailyUserParams): Promise<FindAllDailyUserResponse> {
    const order = await UserApiService.instance.fetchDailyCustomer(params);
    const store = dashboardStore.getModel();

    dashboardStore.updateModel({
      ...store,
      dailyCustomer: order as DailyResponse,
    });
    return order;
  }

  public async fetchBothRecentOrderAndOrderTimeline(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    const store = dashboardStore.getModel();
    const { recentOrder, orderTimeline } = store;
    const response = await OrderApiService.instance.fetchAllOrder({
      page: recentOrder.page,
      pageSize: recentOrder.pageSize,
    });

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
    const store = dashboardStore.getModel();
    const { recentOrder } = store;
    const response = await OrderApiService.instance.fetchAllOrder(params);

    dashboardStore.updateModel({
      ...store,
      recentOrder: {
        ...recentOrder,
        page: params.page as number,
        data: { ...recentOrder.data, [params.page as number]: response.rows },
        count: response.count,
        // nextPage: dataStack.length !== response.count,
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
