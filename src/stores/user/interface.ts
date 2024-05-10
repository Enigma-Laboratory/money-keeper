import { User } from '@enigma-laboratory/shared';

export type UserCollection = Record<string, User>;

export type UserState = {
  count: number;
  rows: UserCollection;
};
