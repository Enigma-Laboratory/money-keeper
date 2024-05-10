import { FindOneUserParams, FindOneUserResponse } from '@enigma-laboratory/shared';
import { UserApiService } from 'services/UserApiService';
import { arrayToObject } from 'utils';
import { UserCollection } from './interface';
import { usersStore } from './store';

export class UsersService {
  public static _instance: UsersService;

  public static get instance(): UsersService {
    if (!UsersService._instance) {
      this._instance = new UsersService();
    }
    return this._instance;
  }

  public async fetchOneUser(params: FindOneUserParams): Promise<FindOneUserResponse> {
    try {
      return await UserApiService.instance.fetchOneUser(params);
    } catch (error) {
      throw error;
    }
  }

  public async fetchUsers(): Promise<void> {
    try {
      const { count, rows } = await UserApiService.instance.fetchAllUser();
      const users = arrayToObject('_id', rows);
      usersStore.setModel({
        count,
        rows: users as UserCollection,
      });
    } catch (error) {
      throw error;
    }
  }
}
