import { Order } from '@enigma-laboratory/shared';
import { FindAllResponse } from 'interface';
import { BaseStore } from '../baseStore';

const initialState: FindAllResponse<Order> = {
  count: 0,
  rows: [],
};

export const orderStore = new BaseStore<FindAllResponse<Order>>(initialState);
