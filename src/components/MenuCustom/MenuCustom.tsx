import React, { ReactElement } from 'react';
import { AppstoreOutlined, CalendarOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd/es/menu';
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
  const items: MenuItem[] = [
    getItem(<a href="/">Dashboard</a>, 'Dashboard', <MailOutlined />),
    getItem(<a href="/home">Home</a>, 'Home', <CalendarOutlined />),
    getItem('Order', 'Order', <AppstoreOutlined />, [
      getItem(<a href="/order">Order</a>, 'order'),
      getItem(<a href="/order-detail">Order Detail</a>, 'order-detail'),
    ]),
    getItem('Setting', 'setting', <SettingOutlined />, [getItem(<a href="/setting/user">User</a>, 'user')]),
  ];

  return (
    <BaseMenu
      mode="inline"
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      style={{ height: '100%', borderRight: 0 }}
      items={items}
    />
  );
};
