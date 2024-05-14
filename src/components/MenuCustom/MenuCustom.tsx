import { AppstoreOutlined, MailOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import type { MenuProps } from 'antd/es/menu';
import { authProvider } from 'context/authProvider';
import { useLocalStorage } from 'hooks';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { USER_IDENTITY } from 'utils';
import { BaseMenu } from '../BaseMenu';

type MenuItem = Required<MenuProps>['items'][number];

const PATHNAME = {
  HOME: '/',
  ORDER: '/orders',
  CUSTOMER: '/customer',
  PRODUCT: '/product',
  CATEGORY: '/categories',
  PROFILE: '/profile',
};

export const MenuCustom = (): ReactElement => {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');
  const [activeItem, setActiveItem] = useState<string[]>([]);

  const handleUserLogout = async () => {
    await authProvider.logout({});
    window.location.reload();
  };
  const [user] = useLocalStorage<User>(USER_IDENTITY);

  const items: MenuItem[] = [
    {
      label: <Link to={PATHNAME.HOME}>{t('sidebar.dashboard')}</Link>,
      key: 'dashboard',
      icon: <MailOutlined />,
    },
    {
      label: <Link to={PATHNAME.ORDER}>{t('sidebar.orders')}</Link>,
      key: 'orders',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={PATHNAME.CUSTOMER}>{t('sidebar.customers')} </Link>,
      key: 'customers',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={PATHNAME.PRODUCT}>{t('sidebar.products')}</Link>,
      key: 'products',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={PATHNAME.CATEGORY}>{t('sidebar.categories')}</Link>,
      key: 'categories',
      icon: <AppstoreOutlined />,
    },
    {
      label: <Link to={PATHNAME.PROFILE + '/' + user._id}>{t('sidebar.profile')}</Link>,
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
    switch (pathname) {
      case PATHNAME.HOME:
        setActiveItem(['dashboard']);
        break;
      case PATHNAME.ORDER:
        setActiveItem(['orders']);
        break;
      case PATHNAME.CUSTOMER:
        setActiveItem(['customers']);
        break;
      case PATHNAME.PRODUCT:
        setActiveItem(['products']);
        break;
      case PATHNAME.CATEGORY:
        setActiveItem(['categories']);
        break;
      case PATHNAME.PROFILE:
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
