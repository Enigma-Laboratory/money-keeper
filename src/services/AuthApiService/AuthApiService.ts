import {
  CreateUserParams,
  DeleteOneUserParams,
  FindAllUserResponse,
  FindOneUserParams,
  UpdateOneUserParams,
  User,
} from '@enigma-laboratory/shared';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfigAuth } from '../http';
import { HttpConfig } from '../http';

export class AuthApiService extends ApiServiceEndPoint {
  private static _instance: AuthApiService;

  public static get instance(): AuthApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.AUTH}`;
  }

  public async fetchAllUser(): Promise<FindAllUserResponse> {
    return await HttpClientService.httpGet<FindAllUserResponse>(this.endPoint);
  }
  public async fetchOneUser(params: FindOneUserParams): Promise<User> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.GET_ONE_USER}/${params._id}`;
    return await HttpClientService.httpGet<User>(endpoint);
  }

  public async signIn(params: { email: string; password: string }): Promise<{ token: string }> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_IN}`;
    return await HttpClientService.httpPost<any>(endpoint, params);
  }

  public async signUp(params: CreateUserParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_UP}`;
    return await HttpClientService.httpPost<any>(endpoint, params);
  }

  public async updateUserInfo(params: UpdateOneUserParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.UPDATE_USER}`;
    return await HttpClientService.httpPatch<any>(endpoint, params);
  }

  public async deleteOneUser(params: DeleteOneUserParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.DELETE_USER}/${params._id}`;
    return await HttpClientService.httpDelete<any>(endpoint);
  }
}
