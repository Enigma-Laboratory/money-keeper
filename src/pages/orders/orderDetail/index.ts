import { OrderDetail } from './OrderDetail';
import { withOrderDetailController } from './withOrderDetail';

export { EditOrderScreen } from './editOrder';

export const OrderDetailScreen = withOrderDetailController(OrderDetail);
