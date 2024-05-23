import {
  DeleteOneUserParams,
  FindAllUserResponse,
  FindOneUserParams,
  UpdateOneUserParams,
  User,
} from '@enigma-laboratory/shared';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig } from '../HttpService';

export class UserApiService extends ApiServiceEndPoint {
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

  public async updateOneUser(params: UpdateOneUserParams): Promise<User> {
    return await HttpClientService.httpPut<User>(this.endPoint, params);
  }

  public async deleteOneUser(params: DeleteOneUserParams): Promise<void> {
    const endpoint = `${this.endPoint}/${params._id}`;
    return await HttpClientService.httpDelete(endpoint);
  }
}
