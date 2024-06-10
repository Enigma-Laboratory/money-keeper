import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  DeleteOneOrderResponse,
  FindAllDailyOrderParams,
  FindAllDailyOrderResponse,
  FindAllDailyOrderRevenueParams,
  FindAllDailyOrderRevenueResponse,
  FindAllOrderParams,
  FindAllOrderResponse,
  FindOneOrderParams,
  Order,
  UpdateManyOrderStatusesParams,
  UpdateManyOrderStatusesResponse,
  UpdateOneOrderParams,
  UpdateOrderStatusParams,
  UpdateOrderStatusResponse,
} from '@enigma-laboratory/shared';

import { ApiEndpointService, HttpClientService, HttpConfig, HttpConfigOrder } from 'services';

export class OrderApiService extends ApiEndpointService {
  private static _instance: OrderApiService;

  public static get instance(): OrderApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.ORDERS}`;
  }

  public async fetchAllOrder(params: FindAllOrderParams): Promise<FindAllOrderResponse> {
    return await HttpClientService.httpGet<FindAllOrderResponse>(this.endPoint, { params });
  }

  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpGet<Order>(endpoint);
  }

  public async fetchDailyOrder(params: FindAllDailyOrderParams): Promise<FindAllDailyOrderResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DAILY_ORDER}`;
    return await HttpClientService.httpGet<FindAllDailyOrderResponse>(endpoint, { params });
  }

  public async fetchDailyRevenue(params: FindAllDailyOrderRevenueParams): Promise<FindAllDailyOrderRevenueResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DAILY_REVENUE}`;
    return await HttpClientService.httpGet<FindAllDailyOrderRevenueResponse>(endpoint, { params });
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}`;
    return await HttpClientService.httpPost<Order>(endpoint, params);
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<Order> {
    return await HttpClientService.httpPut<Order>(this.endPoint, params);
  }

  public async UpdateManyOrderStatus(params: UpdateManyOrderStatusesParams): Promise<UpdateManyOrderStatusesResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER_STATUSES}`;
    return await HttpClientService.httpPut<UpdateManyOrderStatusesResponse>(endpoint, params);
  }

  public async updateOrderStatus(params: UpdateOrderStatusParams): Promise<UpdateOrderStatusResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER_STATUS}`;
    return await HttpClientService.httpPut<UpdateOrderStatusResponse>(endpoint, params);
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<DeleteOneOrderResponse> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpDelete<DeleteOneOrderResponse>(endpoint);
  }
}
