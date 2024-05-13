import {
  CreateOneOperationalSettingParams,
  DeleteOneOperationalSettingParams,
  OperationalSetting,
  UpdateOneOperationalSettingParams,
} from '@enigma-laboratory/shared';
import { OperationalSettingApiService } from 'services/OperationalSettingsApiService';
import { arrayToObject } from 'utils';
import { operationalSettingStore } from './store';

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
    } catch (error) {
      throw error;
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
    } catch (error) {
      throw error;
    }
  }

  public async updateOneOperationalSetting(params: UpdateOneOperationalSettingParams): Promise<void> {
    try {
      await OperationalSettingApiService.instance.updateOneOperationalSetting(params);
      // const { _id } = operationalSetting;
      // const { count, rows: operationalSettings } = operationalSettingStore.getModel();
      // operationalSettings[_id] = operationalSetting;
      // operationalSettingStore.updateModel({
      //   count,
      //   rows: { ...operationalSettings },
      // });
    } catch (error) {
      throw error;
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

  public createdOperationalSettingIO(operationalSetting: OperationalSetting) {
    operationalSettingStore.updateModel((model) => ({
      count: model.count + 1,
      rows: { ...model.rows, [operationalSetting._id]: operationalSetting },
    }));
  }

  public updatedOperationalSettingIO(operationalSetting: OperationalSetting) {
    operationalSettingStore.updateModel((model) => ({
      count: model.count,
      rows: { ...model.rows, [operationalSetting._id]: operationalSetting },
    }));
  }
  public deletedOperationalSettingIO(operationalSetting: OperationalSetting) {
    operationalSettingStore.updateModel(({ count, rows }) => {
      delete rows[operationalSetting._id];
      return {
        count: count - 1,
        rows: { ...rows },
      };
    });
  }
}
