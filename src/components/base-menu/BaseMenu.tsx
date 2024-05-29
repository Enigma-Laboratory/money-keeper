import type { MenuProps } from 'antd/es/menu';
import Menu from 'antd/es/menu';
import { ReactElement } from 'react';

export const BaseMenu = (props: MenuProps): ReactElement => {
  return <Menu {...props} />;
};