import { ReactElement } from 'react';

import type { MenuProps } from 'antd/es/menu';
import Menu from 'antd/es/menu';

export const BaseMenu = (props: MenuProps): ReactElement => {
  return <Menu {...props} />;
};
