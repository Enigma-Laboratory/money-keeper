import { AboutScreen } from 'pages/about';
import { ContactScreen } from 'pages/contact';
import { HomeScreen } from 'pages/home';
import { DetailedInvoice } from 'pages/home/analytic/DetailedInvoice';
import { OrderScreen } from 'pages/order';
import { CreateOrderScreen } from 'pages/order/createOrder';
import { EditOrderScreen } from 'pages/order/detailOrder/editOrder';
import { DetailOrderScreen } from 'pages/order/detailOrder';
import { Dashboard } from 'pages/dashboard';
import { NotFound } from 'components/NotFound';

const ROUTE_PATH = '/';

export interface RouteComponent {
  name: string;
  path: string;
  component: JSX.Element;
}

const getPath = (path: string): string => `${ROUTE_PATH}${path}`;

export const routePaths = {
  dashboard: getPath('/'),
  home: getPath('/home'),
  about: getPath('/about'),
  contact: getPath('/contact'),
  detail: getPath('/detail'),
  orders: getPath('/orders'),
  detailOrder: getPath('order/detail-order/:id'),
  createOrder: getPath('order/create'),
  editOrder: getPath('order/edit/:id'),
};

export const routeComponents: RouteComponent[] = [
  {
    name: 'dashboard',
    path: routePaths.dashboard,
    component: <Dashboard />,
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
    path: routePaths.orders,
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
  {
    name: 'page-not-found',
    path: '*',
    component: <NotFound />,
  },
];
