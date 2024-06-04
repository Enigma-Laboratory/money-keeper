import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
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

  return (
    <HeaderLayoutStyled>
      <Button type="text" onClick={toggleCollapsed} style={{ marginBottom: 0 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
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
