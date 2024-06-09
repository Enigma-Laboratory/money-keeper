import { GlobalToken, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { AntdTokenService } from 'services';
import { ThemeProvider as StyledComponentProvider, ThemeProviderComponent } from 'styled-components';

const StyledThemeProvider: ThemeProviderComponent<GlobalToken> = StyledComponentProvider;

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { token } = theme.useToken();
  AntdTokenService.instance.setToken(token);

  return <StyledThemeProvider theme={token}>{children}</StyledThemeProvider>;
};
