import React, { ReactNode } from 'react';

import { Layout, theme } from 'antd';
import { LayoutMainStyled } from './LayoutMain.styles';
import { HeaderLayout, MenuCustom } from 'components';

const { Content, Sider } = Layout;

export interface LayoutMainProps {
  children: ReactNode;
}

export const LayoutMain = (props: LayoutMainProps) => {
  const { children } = props;
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <LayoutMainStyled>
      <Layout style={{ marginLeft: 200, marginTop: 64 }}>
        <HeaderLayout />
        <Sider
          width={200}
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 64,
            bottom: 0,
            background: colorBgContainer,
          }}
        >
          <MenuCustom />
        </Sider>
        <Layout style={{ padding: 10 }}>
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
      </Layout>
    </LayoutMainStyled>
  );
};
