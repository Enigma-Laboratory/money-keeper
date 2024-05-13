/* eslint-disable import/no-anonymous-default-export */

import { OrderStatus } from '@enigma-laboratory/shared';

const { CANCELLED, CONFIRM, DONE, PROCESSING } = OrderStatus;

export default {
  sidebar: {
    dashboard: 'Tổng Quan',
    orders: 'Đơn Hàng',
    customers: 'Khách Hàng',
    products: 'Sản Phẩm',
    categories: 'Danh Mục',
    logout: 'Đăng Xuất',
  },
  language: {
    title: 'Ngôn ngữ',
    en: 'Anh',
    vi: 'Việt',
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
  alertTitle: {
    info: 'Thông tin',
    confirm: 'Xác nhận',
    error: 'Lỗi',
    warning: 'Cảnh báo',
    success: 'Thành công',
    close: 'Đóng',
    ok: 'Đồng ý',
  },
};
