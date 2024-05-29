import { Layout } from 'antd';
import styled, { css } from 'styled-components';
import { tablet } from 'styles/media-queries';

const StyledLayout = styled(Layout)`
  height: 100vh;
  background-color: ${(props) => props.theme.colorBgContainer};
`;

const StyledSider = styled(Layout.Sider)`
  && {
    ${tablet(css`
      display: none;
    `)};
  }
`;

const StyledContent = styled(Layout.Content)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

StyledLayout.Sider = StyledSider as typeof StyledLayout.Sider;
StyledLayout.Content = StyledContent as typeof StyledLayout.Content;

export default StyledLayout;
