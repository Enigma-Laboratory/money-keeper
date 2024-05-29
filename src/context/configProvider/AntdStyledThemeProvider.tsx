import { GlobalToken, theme } from 'antd';
import { PropsWithChildren } from 'react';
import { ThemeProvider, ThemeProviderComponent } from 'styled-components';

const AntdStyledThemeProvider: ThemeProviderComponent<GlobalToken> = ThemeProvider;

export const CustomThemeProvider: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const { token } = theme.useToken();

  return <AntdStyledThemeProvider theme={token}>{children}</AntdStyledThemeProvider>;
};
