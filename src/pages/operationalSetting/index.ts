import { OperationalSettings } from './OperationalSetting';
import { withOrderController } from './withOperationalSettingController';

export * from './createOrder';
export * from './editOrder';
export * from './orderDetail';

export const OperationalSettingScreen = withOrderController(OperationalSettings);
