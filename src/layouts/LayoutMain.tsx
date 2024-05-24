import { ReactNode, useState } from 'react';

import { Layout, theme } from 'antd';
import { HeaderLayout, MenuCustom } from 'components';
import { LayoutMainStyled } from './LayoutMain.styles';

const { Content, Sider } = Layout;

export interface LayoutMainProps {
  children: ReactNode;
}

export const LayoutMain = (props: LayoutMainProps) => {
  const { children } = props;
  console.log('main layout');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <LayoutMainStyled>
      <HeaderLayout collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
      <Layout hasSider style={{ marginTop: 64 }}>
        <Sider collapsed={collapsed} style={{ background: colorBgContainer }}>
          <MenuCustom />
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
