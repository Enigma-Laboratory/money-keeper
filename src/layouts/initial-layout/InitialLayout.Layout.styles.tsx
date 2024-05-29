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
  position: relative;
`;

export const StyledHeader = styled(Layout.Header)`
  position: absolute;
  inset: 0 0 auto;
  z-index: 1;
  background: none;
  display: inline-flex;
`;

StyledLayout.Sider = StyledSider as typeof StyledLayout.Sider;
StyledLayout.Content = StyledContent as typeof StyledLayout.Content;
StyledLayout.Header = StyledHeader as typeof StyledLayout.Header;

export default StyledLayout;
