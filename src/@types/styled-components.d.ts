import { GlobalToken } from 'antd';
import type { CSSProp } from 'styled-components';
import Theme from './theme';

type ThemeType = typeof Theme;

declare module 'styled-components' {
  export interface DefaultTheme extends GlobalToken {}
}

declare module 'react' {
  interface DOMAttributes<T> {
    css?: CSSProp;
  }
}
