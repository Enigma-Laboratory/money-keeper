import { OperationalSettings } from './OperationalSetting';
import { withOrderController } from './withOperationalSettingController';

export * from './create-order';
export * from './detail-order';
export * from './edit-order';

export const OperationalSettingScreen = withOrderController(OperationalSettings);
