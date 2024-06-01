import { FC, PropsWithChildren, useState } from 'react';

import { Layout, theme } from 'antd';
import { HeaderLayout, Menu } from 'components';
import { useKeyboardShortcut } from 'hooks';
import { LayoutMainStyled } from './LayoutMain.styles';

const { Content, Sider } = Layout;

export const LayoutMain: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { token } = theme.useToken();
  const { toggleTheme } = useKeyboardShortcut();
  toggleTheme();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <LayoutMainStyled>
      <HeaderLayout collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout hasSider style={{ marginTop: 64 }}>
        <Sider collapsed={collapsed} style={{ background: token.colorBgContainer }}>
          <Menu />
        </Sider>
        <Content
          style={{
            padding: 14,
            margin: 0,
            overflowY: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </LayoutMainStyled>
  );
};
