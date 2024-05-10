import { Order } from '@enigma-laboratory/shared';

export type OrderCollection = Record<string, Order>;

export type OrderState = {
  count: number;
  rows: OrderCollection;
};
