import {
  CreateOrderDetailParams,
  DeleteOrderDetailParams,
  FindAllOrderDetailResponse,
  FindOneOrderDetailParams,
  OrderDetail,
  UpdateOrderDetailParams,
} from 'stores/orderDetail';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig, HttpConfigOrder } from '../Http';

export class OrderDetailApiService extends ApiServiceEndPoint {
  private static _instance: OrderDetailApiService;

  public static get instance(): OrderDetailApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.ORDER_DETAILS}`;
  }

  public async fetchAllOrderDetail(): Promise<FindAllOrderDetailResponse> {
    return await HttpClientService.httpGet<FindAllOrderDetailResponse>(this.endPoint);
  }
  public async fetchOneOrderDetail(params: FindOneOrderDetailParams): Promise<OrderDetail> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.GET_ONE_ORDER}/${params.id}`;
    return await HttpClientService.httpGet<OrderDetail>(endpoint);
  }

  public async createOneOrderDetail(params: CreateOrderDetailParams): Promise<OrderDetail> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.CREATE_ORDER}`;
    return await HttpClientService.httpPost<OrderDetail>(endpoint, params);
  }

  public async updateOneOrderDetail(params: UpdateOrderDetailParams): Promise<OrderDetail> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.UPDATE_ORDER}`;
    return await HttpClientService.httpPatch<OrderDetail>(endpoint, params);
  }

  public async deleteOneOrderDetail(params: DeleteOrderDetailParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigOrder.DELETE_ORDER}/${params.id}`;
    return await HttpClientService.httpDelete<any>(endpoint);
  }
}
