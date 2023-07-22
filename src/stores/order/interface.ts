/**
 * @interface ORDER
 */

import { FindAllParams, FindAllResponse, getOneParams } from "/interface";

export interface Order {
  id: string;
  orderName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteOrderParams extends getOneParams {}

export interface DeleteOrderResponse {}

export interface FindOneOrderParams extends getOneParams {}

export interface FindAllOrderParams extends Partial<Order>, FindAllParams {}

export interface FindOneOrderResponse extends Partial<Order> {}

export interface FindAllOrderResponse extends FindAllResponse<Order> {}

export interface UpdateOrderParams extends Partial<Order> {}
