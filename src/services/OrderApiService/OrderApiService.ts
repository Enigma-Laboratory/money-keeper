import { ApiServiceEndPoint } from "../ApiServiceEndpoint";
import { HttpClientService } from "../http";
import { HttpConfig, HttpConfigOrder } from "../http";
import { FindAllOrderResponse } from "stores/order";

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
  public async fetchOneOrder(params: any): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.GET_ONE_ORDER}`;
    return await HttpClientService.httpGet(endpoint, params);
  }

  public async createOneOrder(params: any): Promise<void> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.CREATE_ORDER}`;
    return await HttpClientService.httpPost<any>(endpoint, params);
  }

  public async updateOneOrder(params: any): Promise<void> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER}`;
    return await HttpClientService.httpPut<any>(endpoint, params);
  }

  public async deleteOneOrder(params: any): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DELETE_ORDER}`;
    return await HttpClientService.httpDelete<any>(endpoint, params);
  }
}
