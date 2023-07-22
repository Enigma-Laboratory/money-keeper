import { OrderApiService } from "services/OrderApiService";
import { orderStore } from "./store";

export class OrderService {
  public static _instance: OrderService;

  public static get instance(): OrderService {
    if (!OrderService._instance) {
      this._instance = new OrderService();
    }
    return this._instance;
  }

  public async fetchAllOrder(): Promise<any> {
    const response = await OrderApiService.instance.fetchAllOrder();
    orderStore.setModel(response);
  }
}
