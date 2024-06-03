import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Space, theme } from 'antd';
import { AuthService } from 'stores';
import { BaseSearch } from '../base-search';
import { HeaderLayoutStyled } from './Header.styles';
import { UserMenu } from './user-menu';
import { UserNotification } from './user-notification';
type HeaderLayoutProps = {
  collapsed: boolean;
  toggleCollapsed: () => void;
};

export const HeaderLayout = ({ collapsed, toggleCollapsed }: HeaderLayoutProps) => {
  const user = AuthService.instance.getAuth();

  const { token } = theme.useToken();

  return (
    <HeaderLayoutStyled style={{ background: token.colorBgContainer }}>
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
