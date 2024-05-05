import { ConfigProvider as AntdConfigProvider, ThemeConfig, theme } from 'antd';
import { useLocalStorage } from 'hooks';
import i18n from 'i18next';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { en, vi } from 'services/translation/locales';
import { ThemeProvider } from 'styled-components';
import { BaseThemeColors } from './BaseThemeColors';

export enum Languages {
  EN = 'en',
  VI = 'vi',
}

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ConfigProviderContext = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  locate: Languages;
  setLocate: (locate: Languages) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContext | undefined>(undefined);

type ConfigProviderProps = {
  theme?: ThemeConfig;
};

export const ConfigProvider = ({ theme: themeFromProps, children }: PropsWithChildren<ConfigProviderProps>) => {
  const [mode, setMode] = useLocalStorage<Mode>('theme', Mode.LIGHT);

  const [locate, setLocate] = useLocalStorage<Languages>('locate', Languages.VI);

  const handleSetMode = (mode: Mode) => {
    setMode(mode);
    const html = document.querySelector('html');
    html?.setAttribute('data-theme', mode);
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

  const initI18n = useMemo(() => {
    i18n.use(initReactI18next).init({
      resources: { en, vi },
      lng: locate,
      fallbackLng: [Languages.EN, Languages.VI],
      interpolation: {
        escapeValue: false,
      },
      appendNamespaceToMissingKey: true,
      debug: false,
    });
    return i18n;
  }, [i18n, locate]);

  const handleSetLocate = (locate: Languages) => {
    setLocate(locate);
    i18n.changeLanguage(locate);
  };

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode, locate, setLocate: handleSetLocate }}>
      <I18nextProvider i18n={initI18n}>
        <AntdConfigProvider theme={themeProps}>
          <ThemeProvider theme={themeProps}>{children}</ThemeProvider>
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
