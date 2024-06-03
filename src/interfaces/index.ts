import { OrderStatus } from '@enigma-laboratory/shared';
import { Dayjs } from 'dayjs';

export interface FindAllParams<Scope = string> {
  scope?: Scope | string;
  sorters?: Array<string>;
  page?: number;
  pageSize?: number;
}

export interface getOneParams {
  id?: string;
}

export interface FindAllResponse<T> {
  count: number;
  rows: Array<T>;
}

/**
 * @interface ORDER_DETAIL
 */

export interface OrderDetail {
  id: string;
  orderId: string;
  product: string;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrderChart {
  count: number;
  status: 'waiting' | 'ready' | 'on the way' | 'delivered' | 'could not be delivered';
}

export interface IOrderTotalCount {
  total: number;
  totalDelivered: number;
}

export interface ISalesChart {
  date: string;
  title?: 'Order Count' | 'Order Amount';
  value: number;
}

export interface IOrderStatus {
  id: number;
  text: OrderStatus;
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  gender: string;
  gsm: string;
  createdAt: string;
  isActive: boolean;
  avatar: IFile[];
  addresses: IAddress[];
}

export interface IIdentity {
  id: number;
  name: string;
  avatar: string;
}

export interface IAddress {
  text: string;
  coordinate: [number, number];
}

export interface IFile {
  name: string;
  percent: number;
  size: number;
  status: 'error' | 'success' | 'done' | 'uploading' | 'removed';
  type: string;
  uid: string;
  url: string;
}

export interface IEvent {
  date: string;
  status: string;
}

export interface IStore {
  id: number;
  title: string;
  isActive: boolean;
  createdAt: string;
  gsm: string;
  email: string;
  address: IAddress;
  products: IProduct[];
}

export interface ICourierStatus {
  id: number;
  text: 'Available' | 'Offline' | 'On delivery';
}

export interface ICourier {
  id: number;
  name: string;
  surname: string;
  email: string;
  gender: string;
  gsm: string;
  createdAt: string;
  accountNumber: string;
  licensePlate: string;
  address: string;
  avatar: IFile[];
  store: IStore;
  status: ICourierStatus;
  vehicle: IVehicle;
}

export interface IOrder {
  id: number;
  user: IUser;
  createdAt: string;
  products: IProduct[];
  status: IOrderStatus;
  adress: IAddress;
  store: IStore;
  courier: ICourier;
  events: IEvent[];
  orderNumber: number;
  amount: number;
}

export interface IProduct {
  id: number;
  name: string;
  isActive: boolean;
  description: string;
  images: (IFile & { thumbnailUrl?: string })[];
  createdAt: string;
  price: number;
  category: {
    id: number;
    title: string;
  };
  stock: number;
}

export interface ICategory {
  id: number;
  title: string;
  isActive: boolean;
}

export interface IOrderFilterVariables {
  q?: string;
  store?: string;
  user?: string;
  createdAt?: [Dayjs, Dayjs];
  status?: string;
}

export interface IUserFilterVariables {
  q: string;
  status: boolean;
  createdAt: [Dayjs, Dayjs];
  gender: string;
  isActive: boolean;
}

export interface IReview {
  id: number;
  order: IOrder;
  user: IUser;
  star: number;
  createDate: string;
  status: 'pending' | 'approved' | 'rejected';
  comment: string[];
}

export type IVehicle = {
  model: string;
  vehicleType: string;
  engineSize: number;
  color: string;
  year: number;
  id: number;
};

export interface ITrendingProducts {
  id: number;
  product: IProduct;
  orderCount: number;
}

export enum AlertType {
  CONFIRM = 'confirm',
  WARNING = 'warning',
  INFO = 'info',
  ERROR = 'error',
}
export type AlertModalType = 'confirm' | 'warning' | 'info' | 'error' | 'success' | 'delete';

export interface AlertModalPayload {
  data: {
    type: AlertModalType;
    content?: string | JSX.Element;
    subContent?: string | JSX.Element;
    confirmName?: string; //** Name which type in to confirm before deleted */
  };
  dispatch?: {
    handleOk?: () => Promise<void>;
    handleCancel?: () => void;
  };
}
