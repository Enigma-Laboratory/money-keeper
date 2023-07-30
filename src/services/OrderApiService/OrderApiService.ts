import { ApiServiceEndPoint } from "../ApiServiceEndpoint";
import { HttpClientService } from "../http";
import { HttpConfig, HttpConfigOrder } from "../http";
import {
  CreateOrderParams,
  DeleteOrderParams,
  FindAllOrderResponse,
  FindOneOrderParams,
  Order,
} from "stores/order";

export class OrderApiService extends ApiServiceEndPoint {
  private static _instance: OrderApiService;

  public static get instance(): OrderApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.ORDER}`;
  }

  public async fetchAllOrder(): Promise<FindAllOrderResponse> {
    return await HttpClientService.httpGet<FindAllOrderResponse>(this.endPoint);
  }
  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.GET_ONE_ORDER}/${params.id}`;
    return await HttpClientService.httpGet<Order>(endpoint);
  }

  public async createOneOrder(params: CreateOrderParams): Promise<Order> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.CREATE_ORDER}`;
    return await HttpClientService.httpPost<Order>(endpoint, params);
  }

  public async updateOneOrder(params: Order): Promise<Order> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER}`;
    return await HttpClientService.httpPut<Order>(endpoint, params);
  }

  public async deleteOneOrder(params: DeleteOrderParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DELETE_ORDER}/${params.id}`;
    return await HttpClientService.httpDelete<any>(endpoint);
  }
}
