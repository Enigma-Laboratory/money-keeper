import { Orders } from './Order';
import { withOrderController } from './withOrderController';

export { CreateOrderScreen } from './createOrder';
export { EditOrderScreen, OrderDetailScreen } from './orderDetail';

export const OrderScreen = withOrderController(Orders);
