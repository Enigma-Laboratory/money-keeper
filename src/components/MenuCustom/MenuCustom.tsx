import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';
import { authProvider } from 'context/authProvider';
import React, { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { BaseMenu } from '../BaseMenu';

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
  const { t } = useTranslation('common');
  const [activeItem, setActiveItem] = useState<string[]>([]);

  const handleUserLogout = async () => {
    await authProvider.logout({});
    window.location.reload();
  };

  const items: MenuItem[] = [
    getItem(<Link to="/">{t('sidebar.dashboard')}</Link>, 'dashboard', <MailOutlined />),
    getItem(<Link to="/orders">{t('sidebar.orders')}</Link>, 'orders', <AppstoreOutlined />),
    getItem(<Link to="/customers">{t('sidebar.customers')} </Link>, 'customers', <AppstoreOutlined />),
    getItem(<Link to="/products">{t('sidebar.products')}</Link>, 'products', <AppstoreOutlined />),
    getItem(<Link to="/categories">{t('sidebar.categories')}</Link>, 'categories', <AppstoreOutlined />),
    getItem(<div onClick={handleUserLogout}>{t('sidebar.logout')}</div>, 'logout', <AppstoreOutlined />),
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
