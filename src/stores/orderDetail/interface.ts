import { FindAllParams, FindAllResponse, getOneParams } from 'interface';

export interface OrderDetail {
  id: string;
  name: string;
}

export interface DeleteOrderDetailParams extends getOneParams {}

export interface DeleteOrderDetailResponse {}

export interface FindOneOrderDetailParams extends getOneParams {}

export interface FindAllOrderDetailParams extends Partial<OrderDetail>, FindAllParams {}

export interface FindOneOrderDetailResponse extends Partial<OrderDetail> {}

export interface FindAllOrderDetailResponse extends FindAllResponse<OrderDetail> {}

export interface UpdateOrderDetailParams extends Partial<OrderDetail> {}

export interface CreateOrderDetailParams extends Pick<OrderDetail, 'id'> {}
