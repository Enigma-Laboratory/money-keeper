import { ConfigProvider as AntdConfigProvider, ThemeConfig, theme } from 'antd';
import react, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { BaseThemeColors } from './BaseThemeColors';
import { ThemeProvider } from 'styled-components';

type Mode = 'light' | 'dark';

type ConfigProviderContext = {
  mode: Mode;
  setMode: (mode: Mode) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContext | undefined>(undefined);

const defaultMode: Mode = (localStorage.getItem('theme') as Mode) || 'light';

type ConfigProviderProps = {
  theme?: ThemeConfig;
};

export const ConfigProvider = ({ theme: themeFromProps, children }: PropsWithChildren<ConfigProviderProps>) => {
  const [mode, setMode] = useState<Mode>(defaultMode);

  const handleSetMode = (mode: Mode) => {
    localStorage.setItem('theme', mode);
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', mode);
    setMode(mode);
  };

  // add data-theme to html tag
  useEffect(() => {
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', mode);
  }, []);

  const themeProps = {
    ...BaseThemeColors.Orange,
    algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
    ...themeFromProps,
  };

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode }}>
      <AntdConfigProvider theme={themeProps}>
        <ThemeProvider theme={themeProps}>{children}</ThemeProvider>
      </AntdConfigProvider>
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
