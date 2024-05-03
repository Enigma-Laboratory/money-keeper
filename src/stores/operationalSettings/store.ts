import { OperationalSetting } from '@enigma-laboratory/shared';
import { FindAllResponse } from 'interface';
import { BaseStore } from '../baseStore';

const initialState: FindAllResponse<OperationalSetting> = {
  count: 0,
  rows: [],
};

export const operationalSettingStore = new BaseStore<FindAllResponse<OperationalSetting>>(initialState);
