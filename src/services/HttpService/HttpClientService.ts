import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@enigma-laboratory/shared';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { TOKEN_KEY } from 'utils';

export class HttpClientService {
  private static _instance: AxiosInstance;
  public static get instance(): AxiosInstance {
    if (!this._instance) {
      this._instance = this.create();
    }
    return this._instance;
  }

  private static create(): AxiosInstance {
    const header = {
      'Content-type': 'application/json',
    };
    const requestConfig: CreateAxiosDefaults = { headers: header };
    const instance = axios.create(requestConfig);

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 400:
              return Promise.reject(new BadRequestError(data.message));
            case 401:
              return Promise.reject(new UnauthorizedError(data.message));
            case 403:
              return Promise.reject(new ForbiddenError(data.message));
            case 404:
              return Promise.reject(new NotFoundError(data.message));
            case 409:
              return Promise.reject(new ConflictError(data.message));
          }
        } else {
          return Promise.reject(new InternalServerError('Internal Server Error'));
        }
      },
    );

    return instance;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public static async httpGet<T = any>(requestUri: string, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.get(requestUri, config);
    return response.data as T;
  }
  public static async httpPost<T = any>(requestUri: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.post(requestUri, data, config);
    return response.data as T;
  }

  public static async httpPut<T = any>(requestUri: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.put(requestUri, data, config);
    return response.data as T;
  }

  public static async httpPatch<T = any>(requestUri: string, data: unknown, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.patch(requestUri, data, config);
    return response.data as T;
  }

  public static async httpDelete<T = any>(requestUri: string, options?: AxiosRequestConfig): Promise<T> {
    const config = await this.getConfig(options);

    const response: AxiosResponse = await HttpClientService.instance.delete(requestUri, config);
    return response.data as T;
  }

  private static async getConfig(customOptions?: AxiosRequestConfig): Promise<any> {
    const { headers: customHeaders, ...remainingCustomOptions } = customOptions ?? {};
    const additionalHeader = customHeaders ?? (await this.generateHeaders());
    return {
      headers: {
        ...HttpClientService.instance.defaults.headers,
        ...additionalHeader,
      },
      ...remainingCustomOptions,
    };
  }

  /* eslint-enable @typescript-eslint/no-explicit-any */
  private static async generateHeaders() {
    const token = localStorage.getItem(TOKEN_KEY);
    const customHeaders = {
      Authorization: `Bearer ${token}`,
    };
    return {
      ...customHeaders,
    };
  }
}
