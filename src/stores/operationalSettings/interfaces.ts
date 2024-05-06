import { FindAllResponse, OperationalSetting } from '@enigma-laboratory/shared';

export type OperationalSettingState = {
  count: number;
  rows: Record<string, OperationalSetting>;
};
