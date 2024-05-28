import { OperationalSetting } from '@enigma-laboratory/shared';

export type OperationalSettingCollection = Record<string, OperationalSetting>;

export type OperationalSettingState = {
  count: number;
  rows: OperationalSettingCollection;
};
