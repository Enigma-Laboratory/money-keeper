import { CreateUserParams } from '@enigma-laboratory/shared';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig, HttpConfigAuth } from '../http';

export class AuthApiService extends ApiServiceEndPoint {
  private static _instance: AuthApiService;

  public static get instance(): AuthApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.AUTH}`;
  }

  public async signIn(params: { email: string; password: string }): Promise<{ token: string }> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_IN}`;
    return await HttpClientService.httpPost<any>(endpoint, params);
  }

  public async signUp(params: CreateUserParams): Promise<any> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_UP}`;
    return await HttpClientService.httpPost<any>(endpoint, params);
  }
}
