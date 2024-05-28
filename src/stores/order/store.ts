import { BaseStore } from '../base-store';
import { OrderState } from './interface';

const initialState: OrderState = {
  count: 0,
  rows: {},
};

export const orderStore = new BaseStore<OrderState>(initialState);
