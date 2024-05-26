import { CreateUserParams, LoginParams, LoginResponse } from '@enigma-laboratory/shared';
import { ForgotPasswordParams } from 'context';
import { ApiServiceEndPoint } from '../ApiServiceEndpoint';
import { HttpClientService, HttpConfig, HttpConfigAuth } from '../HttpService';

export class AuthApiService extends ApiServiceEndPoint {
  private static _instance: AuthApiService;

  public static get instance(): AuthApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.AUTH}`;
  }

  public async signIn(params: LoginParams): Promise<LoginResponse> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_IN}`;
    return await HttpClientService.httpPost<LoginResponse>(endpoint, params);
  }

  public async signUp(params: CreateUserParams): Promise<void> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_UP}`;
    return await HttpClientService.httpPost(endpoint, params);
  }

  public async refreshToken(params: { refreshToken: string }): Promise<{ token: string }> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.REFRESH_TOKEN}`;
    return await HttpClientService.httpPost<{ token: string }>(endpoint, params);
  }

  public async signOut(params: { refreshToken: string }): Promise<void> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.SIGN_OUT}`;
    return await HttpClientService.httpPost(endpoint, params);
  }

  public async forgotPassword(params: ForgotPasswordParams): Promise<void> {
    const endpoint = `${this.endPoint}/${HttpConfigAuth.FORGOT_PASSWORD}`;
    return await HttpClientService.httpPost(endpoint, params);
  }
}
