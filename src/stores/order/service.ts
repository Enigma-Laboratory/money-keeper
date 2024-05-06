import {
  CreateOneOrderParams,
  DeleteOneOrderParams,
  FindOneOrderParams,
  Order,
  UpdateOneOrderParams,
  UpdateOrderEventParams,
} from '@enigma-laboratory/shared';
import { OrderApiService } from 'services/OrderApiService';
import { orderStore } from './store';
import order from 'services/translation/locales/en/order';

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

  public async fetchOneOrder(params: FindOneOrderParams): Promise<Order> {
    return await OrderApiService.instance.fetchOneOrder(params);
  }

  public async createOneOrder(params: CreateOneOrderParams): Promise<void> {
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

  public async updateOrderStatus(params: UpdateOrderEventParams): Promise<void> {
    try {
      const response = await OrderApiService.instance.updateOrderStatus(params);
      if (response.result === 1) {
        const { rows: orders, count } = orderStore.getModel();
        orderStore.updateModel({
          count,
          rows: orders,
        });
      }
    } catch (e: any) {
      console.error(e);
    }
  }

  public async updateOneOrder(params: UpdateOneOrderParams): Promise<void> {
    try {
      const order = await OrderApiService.instance.updateOneOrder(params);
      const { rows: orders } = orderStore.getModel();
      // orderStore.updateModel({
      //   rows: [...orders, order],
      // });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteOneOrder(params: DeleteOneOrderParams): Promise<void> {
    try {
      const response = await OrderApiService.instance.deleteOneOrder(params);

      const { rows: Orders, count } = orderStore.getModel();
      const newOrders = Orders.filter((order) => order._id !== response.id);
      orderStore.updateModel({
        count: count - 1,
        rows: newOrders,
      });
    } catch (e: any) {
      console.error(e);
    }
  }
}
