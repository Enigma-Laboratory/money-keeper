import { AboutScreen } from 'pages/about';
import { ContactScreen } from 'pages/contact';
import { HomeScreen } from 'pages/home';
import { DetailedInvoice } from 'pages/home/analytic/DetailedInvoice';
import { Landing } from 'pages/landing';
import { OrderScreen } from 'pages/order';
import { CreateOrderScreen } from 'pages/order/createOrder';
import { EditOrderScreen } from 'pages/order/detailOrder/editOrder';
import { ReactElement } from 'react';
import { DetailOrderScreen } from 'pages/order/detailOrder';

const ROUTE_PATH = '/';

export interface RouteComponent {
  name: string;
  path: string;
  component: ReactElement;
}

const getPath = (path: string): string => `${ROUTE_PATH}${path}`;

export const routePaths = {
  landing: getPath(''),
  home: getPath('/home'),
  about: getPath('/about'),
  contact: getPath('/contact'),
  detail: getPath('/detail'),
  order: getPath('/order'),
  detailOrder: getPath('order/detail-order/:id'),
  createOrder: getPath('order/create'),
  editOrder: getPath('order/edit/:id'),
};

export const routeComponents: RouteComponent[] = [
  {
    name: 'landing',
    path: routePaths.landing,
    component: <Landing />,
  },
  {
    name: 'home',
    path: routePaths.home,
    component: <HomeScreen />,
  },
  {
    name: 'about',
    path: routePaths.about,
    component: <AboutScreen />,
  },
  {
    name: 'contact',
    path: routePaths.contact,
    component: <ContactScreen />,
  },
  {
    name: 'detail',
    path: routePaths.detail,
    component: <DetailedInvoice />,
  },
  {
    name: 'order',
    path: routePaths.order,
    component: <OrderScreen />,
  },
  {
    name: 'order-create',
    path: routePaths.createOrder,
    component: <CreateOrderScreen />,
  },
  {
    name: 'order-edit',
    path: routePaths.editOrder,
    component: <EditOrderScreen />,
  },
  {
    name: 'detail-order',
    path: routePaths.detailOrder,
    component: <DetailOrderScreen />,
  },
];
