import { OrderStatus } from '@enigma-laboratory/shared';
const { CANCELLED, CONFIRM, DONE, PROCESSING } = OrderStatus;

export default {
  information: {
    name: 'Tên',
    buyer: 'Người mua',
    status: 'Trạng thái',
    groupName: 'Tên nhóm',
    description: 'Mô tả',
    createdOrderAt: 'Đã tạo đơn hàng lúc: ',
  },
  product: {
    name: 'Tên sản phẩm',
    userIds: 'IDs người dùng',
    price: 'Giá',
    total: 'Tổng',
  },
  orderEvenLog: 'Nhật ký sự kiện đơn hàng',
  updateBtn: 'Cập nhật',
  deleteBtn: 'Xóa',
  orderDetails: 'Chi tiết đơn hàng',
  eventLogs: {
    [PROCESSING]: {
      title: 'đã tạo một đơn hàng.',
      description: 'Đơn hàng đang được xử lý.',
    },
    [CONFIRM]: {
      title: 'đã thay đổi trạng thái thành xác nhận.',
      description: 'Đơn hàng đã được xác nhận và hiện đang chờ hoàn tất.',
    },
    [DONE]: {
      title: 'đã thay đổi trạng thái thành hoàn thành.',
      description: 'Đơn hàng đã được hoàn thành thành công.',
    },
    [CANCELLED]: {
      title: 'đã hủy đơn hàng.',
      description: 'Đơn hàng đã được hủy và không thể chỉnh sửa được nữa.',
    },
  },
};
