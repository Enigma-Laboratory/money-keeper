import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnauthorizedError,
} from '@enigma-laboratory/shared';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { AuthApiService, DEFAULT_HEADERS, NavigateService } from 'services';

import { REFRESH_TOKEN_KEY, TOKEN_KEY } from 'utils';

export class HttpClientService {
  private static _instance: AxiosInstance;
  private static isRefreshing = false;
  private static failedQueue: { resolve: (value?: unknown) => void; reject: (reason?: unknown) => void }[] = [];

  public static get instance(): AxiosInstance {
    if (!this._instance) {
      this._instance = this.create();
    }
    return this._instance;
  }

  private static create(): AxiosInstance {
    const requestConfig: CreateAxiosDefaults = { headers: DEFAULT_HEADERS };
    const instance = axios.create(requestConfig);
    instance.interceptors.response.use(
      (response) => response,
      async (error) => this.handleResponseError(error),
    );

    return instance;
  }

  /* eslint-disable */
  private static async handleResponseError(error: any): Promise<AxiosResponse | never> {
    const originalRequest = error.config;

    if (error.response) {
      const { status, data } = error.response;
      switch (status) {
        case 400:
          throw new BadRequestError(data.message);
        case 401:
          return this.handleUnauthorizedError(originalRequest, data.message);
        case 403:
          throw new ForbiddenError(data.message);
        case 404:
          throw new NotFoundError(data.message);
        case 409:
          throw new ConflictError(data.message);
        default:
          throw new InternalServerError(data.message);
      }
    } else {
      throw new InternalServerError();
    }
  }

  private static async handleUnauthorizedError(
    originalRequest: any,
    errorMessage: string,
  ): Promise<AxiosResponse | never> {
    if (originalRequest._retry) {
      return Promise.reject(new UnauthorizedError(errorMessage));
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

        NavigateService.instance.navigate('/login');
        return Promise.reject(new UnauthorizedError(errorMessage));
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
        NavigateService.instance.navigate('/login');
        return Promise.reject(err);
      });
  }

  private static processQueue(error: unknown, token: string | null = null) {
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
      const refreshTokenResponse = await AuthApiService.instance.refreshToken({ refreshToken });
      if (refreshTokenResponse.token) {
        return refreshTokenResponse.token;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch {
      throw new UnauthorizedError('Failed to refresh token:');
    }
  }

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
    const { headers: customHeaders, params, ...remainingCustomOptions } = customOptions ?? {};
    const customParams = { ...params };
    Object.entries(customParams).forEach(([key, value]) => {
      if (Array.isArray(value)) customParams[key] = JSON.stringify(value);
    });
    const additionalHeader = customHeaders ?? (await this.generateHeaders());
    return {
      headers: {
        ...HttpClientService.instance.defaults.headers,
        ...additionalHeader,
      },
      params: customParams,
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
