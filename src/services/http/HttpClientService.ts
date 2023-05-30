import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  CreateAxiosDefaults,
  AxiosResponse,
} from "axios";

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
      "Content-type": "application/json",
    };
    const requestConfig: CreateAxiosDefaults = { headers: header };
    const instance = axios.create(requestConfig);
    return instance;
  }

  public static async httpGet<T = any>(
    requestUri: string,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const config = await this.getConfig(options);

    const response: AxiosResponse = await HttpClientService.instance.get(
      requestUri,
      config
    );
    return response.data as T;
  }

  public static async httpPost<T = any>(
    requestUri: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.post(
      requestUri,
      data,
      config
    );
    return response.data as T;
  }

  public static async httpPut<T = any>(
    requestUri: string,
    data: any,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const config = await this.getConfig(options);
    const response: AxiosResponse = await HttpClientService.instance.put(
      requestUri,
      data,
      config
    );
    return response.data as T;
  }

  public static async httpDelete<T = any>(
    requestUri: string,
    options?: AxiosRequestConfig
  ): Promise<T> {
    const config = await this.getConfig(options);

    const response: AxiosResponse = await HttpClientService.instance.delete(
      requestUri,
      config
    );
    return response.data as T;
  }

  private static async getConfig(
    customOptions?: AxiosRequestConfig
  ): Promise<any> {
    const { headers: customHeaders, ...remainingCustomOptions } =
      customOptions ?? {};
    const additionalHeader = customHeaders ?? (await this.generateHeaders());
    return {
      header: {
        ...HttpClientService.instance.defaults.headers,
        ...additionalHeader,
      },
      ...remainingCustomOptions,
    };
  }

  private static async generateHeaders() {
    const customHeaders = {};
    return {
      ...customHeaders,
    };
  }
}
