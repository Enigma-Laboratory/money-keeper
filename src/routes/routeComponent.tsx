import { AboutScreen } from "pages/about";
import { ContactScreen } from "pages/contact";
import { HomeScreen } from "pages/home";
import { DetailedInvoice } from "pages/home/analytic/DetailedInvoice";
import { Landing } from "pages/landing";
import { OrderScreen } from "pages/order";
import { CreateOrderScreen } from "pages/order/createOrder";
import { EditOrderScreen } from "pages/order/editOrder";
import { ReactElement } from "react";

const ROUTE_PATH = '/';

export interface RouteComponent{
    id: string, 
    path: string, 
    component: ReactElement
}

const getPath = (path: string): string => `${ROUTE_PATH}${path}`;

export const routePaths = {
    landing: getPath(''),
    home: getPath("/home"),
    about: getPath("/about"),
    contact: getPath('/contact'),
    detail: getPath('/detail'),
    order: getPath("/order"),
    createOrder:getPath("order/create"),
    editOrder: getPath("order/edit/:id")
}


export const routeComponents: RouteComponent[] = [
    {
        id: "landing",
        path: routePaths.landing,
        component: <Landing/>
    },
    {
        id: "home",
        path: routePaths.home,
        component: <HomeScreen/>
    },
    {
        id: "about",
        path: routePaths.about,
        component: <AboutScreen/>
    } ,
     {
        id: "contact",
        path: routePaths.contact,
        component: <ContactScreen/>
    },
    {
        id: "detail",
        path: routePaths.detail,
        component: <DetailedInvoice/>
    },
    {
        id: "order",
        path: routePaths.order,
        component: <OrderScreen/>
    },
    {
        id: "order-create",
        path: routePaths.createOrder,
        component: <CreateOrderScreen/>
    },
    {
        id: "order-edit",
        path: routePaths.editOrder,
        component: <EditOrderScreen/>
    }
]


