import { ConfigProvider as AntdConfigProvider, ThemeConfig, theme } from 'antd';
import { useLocalStorage } from 'hooks';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { I18nextProvider } from 'react-i18next';

import { BaseThemeColors, ThemeProvider } from '../theme-provider';
import i18n from './i18n';

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ConfigProviderContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContextType | undefined>(undefined);

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
    <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode }}>
      <I18nextProvider i18n={i18n}>
        <AntdConfigProvider {...configProviderProps}>
          <ThemeProvider>{children}</ThemeProvider>
        </AntdConfigProvider>
      </I18nextProvider>
    </ConfigProviderContext.Provider>
  );
};

export const useConfigProvider = () => {
  const context = useContext(ConfigProviderContext);

  if (context === undefined) {
    throw new Error('useConfigProvider must be used within a ConfigProvider');
  }

  return context;
};
