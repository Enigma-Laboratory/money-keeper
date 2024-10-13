import { OrderStatus } from '@enigma-laboratory/shared';

const { CANCELLED, CONFIRM, DONE, PROCESSING } = OrderStatus;

export default {
  sidebar: {
    dashboard: 'Tổng Quan',
    orders: 'Đơn Hàng',
    customers: 'Khách Hàng',
    products: 'Sản Phẩm',
    categories: 'Danh Mục',
    profile: 'Trang cá nhân',
    logout: 'Đăng Xuất',
    groups: 'Nhóm',
  },
  language: {
    title: 'Ngôn ngữ',
    lang: 'Tiếng Việt',
  },
  mode: {
    title: 'Chủ đề',
    light: 'Sáng',
    dark: 'Tối',
  },
  settings: 'Cài đặt',
  orderStatus: {
    [CANCELLED]: 'Đã hủy',
    [CONFIRM]: 'Xác nhận',
    [DONE]: 'Hoàn thành',
    [PROCESSING]: 'Đang xử lý',
  },
  alert: {
    closeBtn: 'Đóng',
    okBtn: 'Đồng ý',
    deleteBtn: 'Xoá',
    title: {
      info: 'Thông tin',
      confirm: 'Xác nhận',
      error: 'Lỗi',
      warning: 'Cảnh báo',
      success: 'Thành công',
      delete: 'Xác nhận',
    },
  },
  orderNotification: {
    create: {
      successMessage: 'Tạo đơn hàng thành công',
      successDescription: 'Đơn hàng với {{orderName}} đã được tạo.',
    },
    delete: {
      successMessage: 'Xóa đơn hàng thành công',
      successDescription: 'Đơn hàng với {{orderName}} đã được xóa.',
    },
    update: {
      successMessage: 'Cập nhật đơn hàng thành công',
      successDescription: 'Đơn hàng với {{orderName}} đã được cập nhật.',
    },
  },
  pageNotFound: 'Xin lỗi, trang này không tồn tại.',
  backToHome: 'Trở về trang chủ.',
};
