import {
  DashboardOutlined,
  LogoutOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  TagsOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Flex, Typography } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import { authProvider } from 'contexts';
import { useLocalStorage } from 'hooks';
import { ReactElement, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { USER_IDENTITY, getExactPath, routePaths } from 'utils';
import { BaseMenu } from '../base-menu';

type MenuItem = Required<MenuProps>['items'][number];

export const Menu = (): ReactElement => {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');
  const [activeItem, setActiveItem] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleUserLogout = async () => {
    const { success, redirectTo } = await authProvider.logout();
    if (success) navigate(redirectTo || '');
  };

  const [user] = useLocalStorage<Pick<User, '_id'>>(USER_IDENTITY, { _id: '' });

  const items: MenuItem[] = [
    {
      label: <Link to={routePaths.dashboard}>{t('sidebar.dashboard')}</Link>,
      key: 'dashboard',
      icon: <DashboardOutlined />,
    },
    {
      label: <Link to={routePaths.orders}>{t('sidebar.orders')}</Link>,
      key: 'orders',
      icon: <ShoppingCartOutlined />,
    },
    {
      label: <Link to={routePaths.customer}>{t('sidebar.customers')}</Link>,
      key: 'customers',
      icon: <UserOutlined />,
    },
    {
      label: <Link to={routePaths.product}>{t('sidebar.products')}</Link>,
      key: 'products',
      icon: <TagsOutlined />,
    },
    {
      label: <Link to={getExactPath(routePaths.profile, { id: user._id })}>{t('sidebar.profile')}</Link>,
      key: 'profile',
      icon: <ProfileOutlined />,
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

  return (
    <Flex vertical justify="space-between" style={{ height: '100%' }}>
      <BaseMenu selectedKeys={activeItem} mode="inline" items={items} />
      <BaseMenu
        mode="inline"
        items={[
          {
            label: (
              <Flex vertical>
                <Typography.Text onClick={handleUserLogout}>{t('sidebar.logout')}</Typography.Text>
              </Flex>
            ),
            key: 'logout',
            icon: <LogoutOutlined />,
          },
        ]}
      />
    </Flex>
  );
};
