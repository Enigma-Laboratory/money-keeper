import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import type { MenuProps } from 'antd/es/menu';
import { authProvider } from 'context/authProvider';
import { useLocalStorage } from 'hooks';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { USER_IDENTITY, getExactPath, routePaths } from 'utils';
import { BaseMenu } from '../BaseMenu';

type MenuItem = Required<MenuProps>['items'][number];

export const MenuCustom = (): ReactElement => {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');
  const [activeItem, setActiveItem] = useState<string[]>([]);

  const handleUserLogout = async () => {
    await authProvider.logout();
    window.location.reload();
  };
  const [user] = useLocalStorage<User>(USER_IDENTITY);

  const items: MenuItem[] = [
    {
      label: <Link to={routePaths.dashboard}>{t('sidebar.dashboard')}</Link>,
      key: 'dashboard',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={routePaths.orders}>{t('sidebar.orders')}</Link>,
      key: 'orders',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={routePaths.customer}>{t('sidebar.customers')} </Link>,
      key: 'customers',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={routePaths.product}>{t('sidebar.products')}</Link>,
      key: 'products',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={getExactPath(routePaths.profile, { id: user._id })}>{t('sidebar.profile')}</Link>,
      key: 'profile',
      icon: <AppstoreOutlined />,
    },
    {
      label: <div onClick={handleUserLogout}>{t('sidebar.logout')}</div>,
      key: 'logout',
      icon: <AppstoreOutlined />,
    },
  ];

  useEffect(() => {
    switch (pathname.substring(1)) {
      case routePaths.dashboard:
        setActiveItem(['dashboard']);
        break;
      case routePaths.orders:
        setActiveItem(['orders']);
        break;
      case routePaths.customer:
        setActiveItem(['customers']);
        break;
      case routePaths.product:
        setActiveItem(['products']);
        break;
      case routePaths.profile:
        setActiveItem(['profile']);
        break;
      case 'logout':
        setActiveItem(['logout']);
        break;
      default:
        return;
    }
  }, [pathname]);

  return <BaseMenu selectedKeys={activeItem} mode="inline" style={{ height: '100%', borderRight: 0 }} items={items} />;
};
