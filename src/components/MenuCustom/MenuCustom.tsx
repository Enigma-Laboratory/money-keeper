import React, { ReactElement, useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';
import { BaseMenu } from '../BaseMenu';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

export const MenuCustom = (): ReactElement => {
  const { pathname } = useLocation();
  const [activeItem, setActiveItem] = useState<string[]>([]);

  const items: MenuItem[] = [
    getItem(<Link to="/">Dashboard</Link>, 'dashboard', <MailOutlined />),
    getItem(<Link to="/orders">Orders</Link>, 'orders', <AppstoreOutlined />),
    getItem(<Link to="/customers">Customers</Link>, 'customers', <AppstoreOutlined />),
    getItem(<Link to="/products">Products</Link>, 'products', <AppstoreOutlined />),
    getItem(<Link to="/categories">Categories</Link>, 'categories', <AppstoreOutlined />),
    getItem(<Link to="/logout">Logout</Link>, 'logout', <AppstoreOutlined />),
  ];

  useEffect(() => {
    if (pathname === '/') {
      setActiveItem(['dashboard']);
    } else if (pathname === '/orders') {
      setActiveItem(['orders']);
    } else if (pathname === '/customers') {
      setActiveItem(['customers']);
    } else if (pathname === '/products') {
      setActiveItem(['products']);
    } else if (pathname === '/categories') {
      setActiveItem(['categories']);
    } else if (pathname === '/logout') {
      setActiveItem(['logout']);
    }
  }, [pathname]);

  return <BaseMenu selectedKeys={activeItem} mode="inline" style={{ height: '100%', borderRight: 0 }} items={items} />;
};
