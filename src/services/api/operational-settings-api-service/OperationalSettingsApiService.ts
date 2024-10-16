import {
  CreateOneOperationalSettingParams,
  DeleteOneOperationalSettingParams,
  DeleteOneOperationalSettingResponse,
  FindAllOperationalSettingResponse,
  OperationalSetting,
  UpdateOneOperationalSettingParams,
} from '@enigma-laboratory/shared';

import { ApiEndpointService, HttpClientService, HttpConfig } from 'services';

export class OperationalSettingApiService extends ApiEndpointService {
  private static _instance: OperationalSettingApiService;

  public static get instance(): OperationalSettingApiService {
    return this._instance || new this();
  }

  constructor() {
    super();
    this.endPoint = `${this.endPoint}/${HttpConfig.OPERATIONAL_SETTINGS}`;
  }

  public async fetchAllOperationalSetting(): Promise<FindAllOperationalSettingResponse> {
    return await HttpClientService.httpGet<FindAllOperationalSettingResponse>(this.endPoint);
  }

  public async createOneOperationalSetting(params: CreateOneOperationalSettingParams): Promise<OperationalSetting> {
    return await HttpClientService.httpPost<OperationalSetting>(this.endPoint, params);
  }

  public async updateOneOperationalSetting(params: UpdateOneOperationalSettingParams): Promise<OperationalSetting> {
    return await HttpClientService.httpPut<OperationalSetting>(this.endPoint, params);
  }

  public async deleteOneOperationalSetting(
    params: DeleteOneOperationalSettingParams,
  ): Promise<DeleteOneOperationalSettingResponse> {
    return await HttpClientService.httpDelete<DeleteOneOperationalSettingResponse>(`${this.endPoint}/${params._id} `);
  }
}
