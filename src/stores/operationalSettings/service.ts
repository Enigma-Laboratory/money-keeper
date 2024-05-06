import { OperationalSettingApiService } from 'services/OperationalSettingsApiService';
import { operationalSettingStore } from './store';
import {
  CreateOneOperationalSettingParams,
  DeleteOneOperationalSettingParams,
  UpdateOneOperationalSettingParams,
} from '@enigma-laboratory/shared';
import { arrayToObject } from 'utils';

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
      const { count, rows } = await OperationalSettingApiService.instance.fetchAllOperationalSetting();

      const operationalSettings = arrayToObject('_id', rows);
      operationalSettingStore.setModel({ count, rows: operationalSettings });
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
        rows: { ...operationalSettings, operationalSetting },
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async updateOneOperationalSetting(params: UpdateOneOperationalSettingParams): Promise<void> {
    try {
      const operationalSetting = await OperationalSettingApiService.instance.updateOneOperationalSetting(params);
      const { _id } = operationalSetting;
      const { count, rows: operationalSettings } = operationalSettingStore.getModel();
      operationalSettings[_id] = operationalSetting;

      operationalSettingStore.updateModel({
        count,
        rows: { ...operationalSettings },
      });
    } catch (e: any) {
      console.error(e);
    }
  }

  public async deleteOneOperationalSetting(params: DeleteOneOperationalSettingParams): Promise<void> {
    try {
      const { result } = await OperationalSettingApiService.instance.deleteOneOperationalSetting(params);

      if (result) {
        throw Error("Can't delete Operational Setting");
      }

      const { rows: OperationalSettings, count } = operationalSettingStore.getModel();

      delete OperationalSettings?.[params._id];
      operationalSettingStore.updateModel({
        count: count - 1,
        rows: OperationalSettings,
      });
    } catch (e: any) {
      console.error(e);
    }
  }
}
