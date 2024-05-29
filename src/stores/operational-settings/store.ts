import { BaseStore } from '../base-store';
import { OperationalSettingState } from './interfaces';

const initialState: OperationalSettingState = {
  count: 0,
  rows: {},
};

export const operationalSettingStore = new BaseStore<OperationalSettingState>(initialState);
