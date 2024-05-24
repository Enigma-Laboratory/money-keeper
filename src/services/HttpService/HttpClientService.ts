import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@enigma-laboratory/shared';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { AuthApiService } from 'services/AuthApiService';
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from 'utils';

export class HttpClientService {
  private static _instance: AxiosInstance;
  private static isRefreshing = false;
  private static failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: any) => void }[] = [];

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
        console.log(error);
        if (error.response) {
          const { status, data } = error.response;
          switch (status) {
            case 400:
              return Promise.reject(new BadRequestError(data.message));

            case 401:
              if (originalRequest._retry) {
                return Promise.reject(new UnauthorizedError(data.message));
              }
              originalRequest._retry = true;

              if (!this.isRefreshing) {
                this.isRefreshing = true;
                try {
                  const newToken = await this.refreshToken();
                  localStorage.setItem(TOKEN_KEY, newToken);
                  this.instance.defaults.headers['Authorization'] = `Bearer ${newToken}`;
                  this.processQueue(null, newToken);
                } catch (err) {
                  this.processQueue(err, null);
                  localStorage.removeItem(TOKEN_KEY);
                  return Promise.reject(new UnauthorizedError(data.message));
                } finally {
                  this.isRefreshing = false;
                }
              }

              return new Promise((resolve, reject) => {
                this.failedQueue.push({ resolve, reject });
              })
                .then((token) => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`;
                  return this.instance(originalRequest);
                })
                .catch((err) => {
                  return Promise.reject(err);
                });

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

  private static processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    this.failedQueue = [];
  }

  private static async refreshToken(): Promise<string> {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) throw new Error('Failed to refresh token');

    try {
      const response = await AuthApiService.instance.refreshToken({ refreshToken });
      if (response.token) {
        return response.token;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch {
      throw new UnauthorizedError('Failed to refresh token:');
    }
  }

  /* eslint-disable */
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
  /* eslint-enable */

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
