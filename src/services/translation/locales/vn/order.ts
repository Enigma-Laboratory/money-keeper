/* eslint-disable import/no-anonymous-default-export */
import { CreateOrderSteps } from 'pages/operationalSetting/createOrder/CreateOrder';

const { INFORMATION, PRODUCT, CONFIRM, DONE } = CreateOrderSteps;

export default {
  form: {
    title: 'Tạo Đơn Hàng',
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
    description: {
      title: 'Ghi Chú',
      message: 'Vui lòng nhập ghi chú',
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
  btnUpdate: 'Cập Nhật',
  btnNext: 'Tiếp',
  btnDone: 'Hoàn Thành',
  btnCreate: 'Tạo',
  btnPrevious: 'Trước',
};
