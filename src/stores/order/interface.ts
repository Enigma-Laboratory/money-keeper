/**
 * @interface ORDER
 */

import { FindAllParams, FindAllResponse, getOneParams } from 'interface';

export interface Order {
  id: string;
  orderName: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DeleteOneOrderParams extends getOneParams {}

export interface DeleteOrderResponse {}

export interface FindOneOrderParams extends getOneParams {}

export interface FindAllOneOrderParams extends Partial<Order>, FindAllParams {}

export interface FindOneOrderResponse extends Partial<Order> {}

export interface FindAllOrderResponse extends FindAllResponse<Order> {}

export interface UpdateOneOrderParams extends Partial<Order> {}

export interface CreateOneOrderParams extends Pick<Order, 'userId' | 'orderName'> {}
