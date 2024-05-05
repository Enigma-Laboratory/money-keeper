import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  FindAllOrderResponse,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
} from '@enigma-laboratory/shared';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig, HttpConfigOrder } from '../http';

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
    const endpoint = `${this.endPoint}/${HttpConfigOrder.GET_ONE_ORDER}/${params._id}`;
    return await HttpClientService.httpGet<Order>(endpoint);
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}`;
    return await HttpClientService.httpPost<Order>(endpoint, params);
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER}`;
    return await HttpClientService.httpPatch<Order>(endpoint, params);
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DELETE_ORDER}/${params._id}`;
    return await HttpClientService.httpDelete<any>(endpoint);
  }
}
