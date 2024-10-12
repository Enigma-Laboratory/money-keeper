import {
  CreateOneOperationalSettingParams,
  DeleteOneOperationalSettingParams,
  OperationalSetting,
  UpdateOneOperationalSettingParams,
} from '@enigma-laboratory/shared';
import { notification } from 'antd';
import { OperationalSettingApiService } from 'services';
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

  public async fetchAllOperationalSetting(): Promise<void> {
    const { count, rows } = await OperationalSettingApiService.instance.fetchAllOperationalSetting();

    const operationalSettings = arrayToObject('_id', rows);
    operationalSettingStore.setModel({ count, rows: operationalSettings });
  }

  public async createOneOperationalSetting(params: CreateOneOperationalSettingParams): Promise<void> {
    await OperationalSettingApiService.instance.createOneOperationalSetting(params);
  }

  public async updateOneOperationalSetting(params: UpdateOneOperationalSettingParams): Promise<void> {
    await OperationalSettingApiService.instance.updateOneOperationalSetting(params);
  }

  public async deleteOneOperationalSetting(params: DeleteOneOperationalSettingParams): Promise<void> {
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
  }

  public createdOperationalSettingIO(operationalSetting: OperationalSetting) {
    notification.success({
      message: 'Operational settings created Successful',
      description: `The operational settings  with  ${operationalSetting.name}  has been successfully updated.`,
    });

    operationalSettingStore.updateModel((model) => ({
      count: model.count + 1,
      rows: { ...model.rows, [operationalSetting._id]: operationalSetting },
    }));
  }

  public updatedOperationalSettingIO(operationalSetting: OperationalSetting) {
    notification.success({
      message: 'Operational settings Updated Successful',
      description: `The operational settings with name: ${operationalSetting.name} has been successfully updated.`,
    });

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
