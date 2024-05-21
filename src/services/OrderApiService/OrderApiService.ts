import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  DeleteOneOrderResponse,
  FindAllOrderResponse,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderEventParams,
  UpdateOrderEventResponse,
} from '@enigma-laboratory/shared';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig, HttpConfigOrder } from '../HttpService';

export class OrderApiService extends ApiServiceEndPoint {
  private static _instance: OrderApiService;

  public static get instance(): OrderApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.ORDERS}`;
  }

  public async fetchAllOrder(): Promise<FindAllOrderResponse> {
    return await HttpClientService.httpGet<FindAllOrderResponse>(this.endPoint);
  }
  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpGet<Order>(endpoint);
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}`;
    return await HttpClientService.httpPost<Order>(endpoint, params);
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<Order> {
    return await HttpClientService.httpPut<Order>(this.endPoint, params);
  }

  public async updateOrderStatus(params: UpdateOrderEventParams): Promise<UpdateOrderEventResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER_STATUS}`;
    return await HttpClientService.httpPut<UpdateOrderEventResponse>(endpoint, params);
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<DeleteOneOrderResponse> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpDelete<DeleteOneOrderResponse>(endpoint);
  }
}
