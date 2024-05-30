import { Layout } from 'antd';
import styled, { css } from 'styled-components';
import { tablet } from 'styles';

const StyledLayout = styled(Layout)<{ $pathname: string }>`
  transition: all 0.2s;
  transform: translateX(-${(props) => (props.$pathname === '/login' ? 196 / 7 : 0)}%);
  height: 100vh;
  position: fixed;
  width: 140%;
  background-color: ${(props) => props.theme.colorBgContainer};
  ${tablet(css`
    width: 100%;
  `)};
`;

const StyledSider = styled(Layout.Sider)`
  && {
    ${tablet(css`
      display: none;
      visibility: hidden;
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
  justify-content: space-between;
  ${tablet(css`
    justify-content: center;
  `)}
`;

StyledLayout.Sider = StyledSider as typeof StyledLayout.Sider;
StyledLayout.Content = StyledContent as typeof StyledLayout.Content;
StyledLayout.Header = StyledHeader as typeof StyledLayout.Header;

export default StyledLayout;
