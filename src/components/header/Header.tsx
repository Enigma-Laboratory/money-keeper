import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Button, Space, theme } from 'antd';
import { useLocalStorage } from 'hooks';
import { USER_IDENTITY } from 'utils';
import { BaseSearch } from '../base-search';
import { HeaderLayoutStyled } from './Header.styles';
import { UserMenu } from './user-menu';
import { UserNotification } from './user-notification';
type HeaderLayoutProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const HeaderLayout = ({ collapsed, toggleCollapsed }: HeaderLayoutProps) => {
  const [user] = useLocalStorage<Pick<User, 'name'>>(USER_IDENTITY, { name: '' });

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <HeaderLayoutStyled style={{ background: colorBgContainer }}>
      <Button type="text" onClick={toggleCollapsed} style={{ marginBottom: 0 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <div className="logo">
        <p className="title">Money Keeper</p>
        <p className="created-by"> by VietNam Team</p>
      </div>

      <BaseSearch placeholder="Searching for everything" />
      <div className="container-notify">
        <Space size={24}>
          <UserNotification />

          <UserMenu user={user} />
        </Space>
      </div>
    </HeaderLayoutStyled>
  );
};
