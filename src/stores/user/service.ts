import {
  FindAllResponse,
  FindAllUserResponse,
  FindOneUserParams,
  FindOneUserResponse,
  User,
} from '@enigma-laboratory/shared';
import { UserApiService } from 'services/UserApiService';
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
    } catch (e: any) {
      throw Error(e);
    }
  }

  public async fetchUsers(): Promise<FindAllUserResponse> {
    try {
      const response = await UserApiService.instance.fetchAllUser();
      usersStore.setModel(response as FindAllResponse<User>);
      return response;
    } catch (e: any) {
      throw Error(e);
    }
  }
}
