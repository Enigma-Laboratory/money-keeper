import { OrderDetailApiService } from 'services/OrderDetailApiService';
import { orderStore as orderDetailStore } from './store';
import {
  CreateOrderDetailParams,
  DeleteOrderDetailParams,
  FindOneOrderDetailParams,
  OrderDetail,
  UpdateOrderDetailParams,
} from './interface';

export class OrderDetailService {
  public static _instance: OrderDetailService;

  public static get instance(): OrderDetailService {
    if (!OrderDetailService._instance) {
      this._instance = new OrderDetailService();
    }
    return this._instance;
  }

  public async fetchAllOrderDetail(): Promise<any> {
    try {
      const response = await OrderDetailApiService.instance.fetchAllOrderDetail();
      orderDetailStore.setModel(response);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async fetchOneOrderDetail(params: FindOneOrderDetailParams): Promise<OrderDetail> {
    return await OrderDetailApiService.instance.fetchOneOrderDetail(params);
  }

  public async createOneOrderDetail(params: CreateOrderDetailParams): Promise<void> {
    try {
      const order = await OrderDetailApiService.instance.createOneOrderDetail(params);
      const { rows: orders, count } = orderDetailStore.getModel();
      orderDetailStore.updateModel({
        count: count + 1,
        rows: [...orders, order],
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async updateOneOrderDetail(params: UpdateOrderDetailParams): Promise<void> {
    try {
      const order = await OrderDetailApiService.instance.updateOneOrderDetail(params);
      const { rows: orders } = orderDetailStore.getModel();
      // orderStore.updateModel({
      //   rows: [...orders, order],
      // });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteOneOrderDetail(params: DeleteOrderDetailParams): Promise<void> {
    try {
      const response = await OrderDetailApiService.instance.deleteOneOrderDetail(params);

      const { rows: Orders, count } = orderDetailStore.getModel();
      const newOrders = Orders.filter((order) => order.id !== response.id);
      orderDetailStore.updateModel({
        count: count - 1,
        rows: newOrders,
      });
    } catch (e: any) {
      console.error(e);
    }
  }
}
