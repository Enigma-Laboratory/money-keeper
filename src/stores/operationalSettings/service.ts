import { OperationalSettingApiService } from 'services/OperationalSettingsApiService';
import { operationalSettingStore } from './store';
import {
  CreateOneOperationalSettingParams,
  DeleteOneOperationalSettingParams,
  UpdateOneOperationalSettingParams,
} from '@enigma-laboratory/shared';

export class OperationalSettingService {
  public static _instance: OperationalSettingService;

  public static get instance(): OperationalSettingService {
    if (!OperationalSettingService._instance) {
      this._instance = new OperationalSettingService();
    }
    return this._instance;
  }

  public async fetchAllOperationalSetting(): Promise<any> {
    try {
      const response = await OperationalSettingApiService.instance.fetchAllOperationalSetting();
      operationalSettingStore.setModel(response);
    } catch (e: any) {
      console.error(e);
    }
  }

  public async createOneOperationalSetting(params: CreateOneOperationalSettingParams): Promise<void> {
    try {
      const operationalSetting = await OperationalSettingApiService.instance.createOneOperationalSetting(params);
      const { rows: operationalSettings, count } = operationalSettingStore.getModel();
      operationalSettingStore.updateModel({
        count: count + 1,
        rows: [...operationalSettings, operationalSetting],
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async updateOneOperationalSetting(params: UpdateOneOperationalSettingParams): Promise<void> {
    try {
      const operationalSetting = await OperationalSettingApiService.instance.updateOneOperationalSetting(params);
      const { rows: operationalSettings } = operationalSettingStore.getModel();
      // orderStore.updateModel({
      //   rows: [...orders, order],
      // });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteOneOperationalSetting(params: DeleteOneOperationalSettingParams): Promise<void> {
    try {
      const response = await OperationalSettingApiService.instance.deleteOneOperationalSetting(params);

      const { rows: OperationalSettings, count } = operationalSettingStore.getModel();
      const newOperationalSettings = OperationalSettings.filter((order) => order._id !== response.id);
      operationalSettingStore.updateModel({
        count: count - 1,
        rows: newOperationalSettings,
      });
    } catch (e: any) {
      console.error(e);
    }
  }
}
