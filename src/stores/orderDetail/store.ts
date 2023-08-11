import { FindAllResponse } from 'interface';
import { OrderDetail } from './interface';
import { BaseStore } from '../baseStore';

const initialState: FindAllResponse<OrderDetail> = {
  count: 0,
  rows: [],
};

export const orderStore = new BaseStore<FindAllResponse<OrderDetail>>(initialState);
