import { OrderApiService } from 'services/OrderApiService';
import { orderStore } from './store';
import { CreateOrderParams, DeleteOrderParams, Order } from './interface';

export class OrderService {
  public static _instance: OrderService;

  public static get instance(): OrderService {
    if (!OrderService._instance) {
      this._instance = new OrderService();
    }
    return this._instance;
  }

  public async fetchAllOrder(): Promise<any> {
    try {
      const response = await OrderApiService.instance.fetchAllOrder();
      orderStore.setModel(response);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async createOneOrder(params: CreateOrderParams): Promise<void> {
    try {
      const order = await OrderApiService.instance.createOneOrder(params);
      const { rows: orders, count } = orderStore.getModel();
      orderStore.updateModel({
        count: count + 1,
        rows: [...orders, order],
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async updateOneOrder(params: Order): Promise<void> {
    try {
      const order = await OrderApiService.instance.updateOneOrder(params);
      const { rows: orders } = orderStore.getModel();
      orderStore.updateModel({
        rows: [...orders, order],
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteOneOrder(params: DeleteOrderParams): Promise<void> {
    try {
      const response = await OrderApiService.instance.deleteOneOrder(params);

      const { rows: Orders, count } = orderStore.getModel();
      const newOrders = Orders.filter((order) => order.id !== response.id);
      orderStore.updateModel({
        count: count - 1,
        rows: newOrders,
      });
    } catch (e: any) {
      console.error(e);
    }
  }
}
