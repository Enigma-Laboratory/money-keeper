import { Orders } from './Order';
import { withOrderController } from './withOperationalSettingController';

export * from './createOrder';
export * from './orderDetail';

export const OrderScreen = withOrderController(Orders);
