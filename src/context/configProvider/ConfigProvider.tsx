import { ConfigProvider as AntdConfigProvider, GlobalToken, ThemeConfig, theme } from 'antd';
import en_US from 'antd/lib/locale/en_US';
import vi_VN from 'antd/lib/locale/vi_VN';
import { useLocalStorage } from 'hooks';
import i18n from 'i18next';
import { PropsWithChildren, createContext, useContext, useEffect, useMemo } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { en, vi } from 'services';

import { CustomThemeProvider } from './AntdStyledThemeProvider';
import { BaseThemeColors } from './BaseThemeColors';

export enum Languages {
  EN = 'en',
  VI = 'vi',
}

export enum Mode {
  LIGHT = 'light',
  DARK = 'dark',
}

type ConfigProviderContextType = {
  mode: Mode;
  setMode: (mode: Mode) => void;
  locate: Languages;
  setLocate: (locate: Languages) => void;
};

export const ConfigProviderContext = createContext<ConfigProviderContextType | undefined>(undefined);
interface x extends ThemeConfig {
  antd: GlobalToken;
}
type ConfigProviderProps = {
  theme?: x;
};

export const ConfigProvider = ({ theme: themeFromProps, children }: PropsWithChildren<ConfigProviderProps>) => {
  const [mode, setMode] = useLocalStorage<Mode>('theme', Mode.LIGHT);

  const [locate, setLocate] = useLocalStorage<Languages>('locate', Languages.VI);

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
      locale: locate === Languages.VI ? vi_VN : en_US,
      theme: {
        ...BaseThemeColors.Orange,
        algorithm: mode === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
        ...themeFromProps,
        components: {
          Card: {
            colorPrimary: '#00b96b',
          },
        },
      },
    };
  }, [locate, mode, themeFromProps]);

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
  }, [locate]);

  const handleSetLocate = (locate: Languages) => {
    setLocate(locate);
    i18n.changeLanguage(locate);
  };

  return (
    <ConfigProviderContext.Provider value={{ mode, setMode: handleSetMode, locate, setLocate: handleSetLocate }}>
      <I18nextProvider i18n={initI18n}>
        <AntdConfigProvider {...configProviderProps}>
          <CustomThemeProvider>{children}</CustomThemeProvider>
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
