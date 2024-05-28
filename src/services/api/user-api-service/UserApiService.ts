import {
  DeleteOneUserParams,
  FindAllUserResponse,
  FindOneUserParams,
  UpdateOneUserParams,
  User,
} from '@enigma-laboratory/shared';
import { ApiEndpointService, HttpClientService, HttpConfig, HttpConfigAuth } from 'services';

export class UserApiService extends ApiEndpointService {
  private static _instance: UserApiService;

  public static get instance(): UserApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.USERS}`;
  }

  public async fetchAllUser(): Promise<FindAllUserResponse> {
    return await HttpClientService.httpGet<FindAllUserResponse>(this.endPoint);
  }
  public async fetchOneUser(params: FindOneUserParams): Promise<User> {
    const endpoint = `${this.endPoint}/${params.email}`;
    return await HttpClientService.httpGet<User>(endpoint);
  }

  public async updateUserInfo(params: UpdateOneUserParams): Promise<User> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.UPDATE_USER}`;
    return await HttpClientService.httpPatch<User>(endpoint, params);
  }

  public async deleteOneUser(params: DeleteOneUserParams): Promise<void> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpDelete(endpoint);
  }
}
