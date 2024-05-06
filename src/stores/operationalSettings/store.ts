import { OperationalSetting } from '@enigma-laboratory/shared';
import { FindAllResponse } from 'interface';
import { BaseStore } from '../baseStore';
import { OperationalSettingState } from './interfaces';

const initialState: OperationalSettingState = {
  count: 0,
  rows: {},
};

export const operationalSettingStore = new BaseStore<OperationalSettingState>(initialState);
