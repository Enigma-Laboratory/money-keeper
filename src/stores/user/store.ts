import { BaseStore } from '../base-store';
import { UserState } from './interface';

const initialState: UserState = {
  count: 0,
  rows: {},
};

export const usersStore = new BaseStore<UserState>(initialState);
