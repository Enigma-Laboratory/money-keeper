import { ConfigProvider as AntdConfigProvider, ThemeConfig, theme } from 'antd';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { BaseThemeColors, ThemeProvider, i18n } from 'contexts';
import { useLocalStorage } from 'hooks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ConfigProviderContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContextType | undefined>(undefined);
const queryClient = new QueryClient();
type ConfigProviderProps = {
  theme?: ThemeConfig;
};

export const ConfigProvider = ({ theme: themeFromProps, children }: PropsWithChildren<ConfigProviderProps>) => {
  const [mode, setMode] = useLocalStorage<Mode>('theme', Mode.LIGHT);

  const handleSetMode = (mode: Mode) => {
    setMode(mode);
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', mode);
  };

  useEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', mode);
  }, [mode]);

  const configProviderProps = useMemo(() => {
    return {
      theme: {
        ...BaseThemeColors.Orange,
        algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        ...themeFromProps,
      },
    };
  }, [mode, themeFromProps]);

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode }}>
        <I18nextProvider i18n={i18n}>
          <AntdConfigProvider {...configProviderProps}>
            <ThemeProvider>{children}</ThemeProvider>
          </AntdConfigProvider>
        </I18nextProvider>
      </ConfigProviderContext.Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export const useConfigProvider = () => {
  const context = useContext(ConfigProviderContext);

  if (context === undefined) {
    throw new Error('useConfigProvider must be used within a ConfigProvider');
  }

  return context;
};
