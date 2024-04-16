import { ThemeConfig } from 'antd';

type ThemeNames = 'Blue' | 'Purple' | 'Magenta' | 'Red' | 'Orange' | 'Yellow' | 'Green';

export type BaseThemes = Record<ThemeNames, ThemeConfig>;

export const BaseThemeColors: BaseThemes = {
  Blue: {
    token: {
      colorPrimary: '#1677FF',
    },
  },
  Purple: {
    token: {
      colorPrimary: '#722ED1',
    },
  },
  Magenta: {
    token: {
      colorPrimary: '#EB2F96',
    },
  },
  Red: {
    token: {
      colorPrimary: '#F5222D',
    },
  },
  Orange: {
    token: {
      colorPrimary: '#FA541C',
    },
  },
  Yellow: {
    token: {
      colorPrimary: '#FAAD14',
    },
  },
  Green: {
    token: {
      colorPrimary: '#52C41A',
    },
  },
};
