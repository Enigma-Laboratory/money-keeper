import { FindAllResponse, User } from '@enigma-laboratory/shared';
import { BaseStore } from '../baseStore';

const initialState: FindAllResponse<User> = {
  count: 0,
  rows: [],
};

export const usersStore = new BaseStore<FindAllResponse<User>>(initialState);
