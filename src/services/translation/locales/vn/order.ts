/* eslint-disable import/no-anonymous-default-export */
import { CreateOrderSteps } from 'pages/orders/createOrder/CreateOrder';

const { INFORMATION, PRODUCT, CONFIRM, DONE } = CreateOrderSteps;

export default {
  form: {
    group: {
      title: 'Tên Nhóm',
      message: 'Vui lòng nhập tên nhóm của bạn!',
    },
    buyer: {
      title: 'Người Mua',
      message: 'Vui lòng nhập tên người mua!',
    },
    order: {
      title: 'Tên Đơn Hàng',
      message: 'Vui lòng nhập tên đơn hàng của bạn!',
    },
    createdOrderAt: {
      title: 'Thời gian tạo đơn hàng',
      message: 'Vui lòng nhập thời gian tạo đơn hàng',
    },
    product: {
      name: 'Tên',
      userIds: 'ID Người Dùng',
      price: 'Giá',
      messageRequiredName: 'Thiếu tên sản phẩm',
      messageRequiredUserIds: 'Thiếu ID người dùng',
      messageRequiredPrice: 'Thiếu giá',
    },
    addProduct: 'Thêm Sản Phẩm',
    groupName: 'Tên nhóm',
  },
  createOrderStep: {
    [INFORMATION]: 'Thông Tin',
    [PRODUCT]: 'Sản Phẩm',
    [CONFIRM]: 'Xác Nhận',
    [DONE]: 'Hoàn Tất',
  },
};
