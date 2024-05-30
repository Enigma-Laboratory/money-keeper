import { Mode } from 'contexts';
import { SVGProps } from 'react';
type Size = number;
export const Logo = (
  props: SVGProps<SVGSVGElement> & { theme?: 'default' | 'dark' | 'light'; size?: Size | Size[] },
) => {
  const { theme = 'default', size = 28 } = props;
  const color = { logo: 'black', background: 'white' };
  const defaultSize = { width: 28, height: 28 };

  switch (theme) {
    case Mode.LIGHT: {
      color.logo = 'black';
      color.background = 'transparent';
      break;
    }
    case Mode.DARK: {
      color.logo = 'white';
      color.background = 'transparent';

      break;
    }
    default:
      break;
  }

  switch (typeof size) {
    case 'number': {
      defaultSize.width = size;
      defaultSize.height = size;
      break;
    }
    case 'object': {
      defaultSize.width = size[0];
      defaultSize.height = size[1];
      break;
    }
  }

  return (
    <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...defaultSize}>
      <rect width="28" height="28" rx="2" fill={color.background} />
      <path
        d="M10 14C10 11.7909 11.7909 10 14 10C16.2091 10 18 11.7909 18 14C18 16.2091 16.2091 18 14 18H10V14Z"
        fill={color.logo}
      />
      <path
        d="M24 7C24 5.34315 22.6569 4 21 4H7C5.34315 4 4 5.34315 4 7V22.5C4 23.3284 4.67157 24 5.5 24C6.32843 24 7 23.3284 7 22.5V14C7 10.134 10.134 7 14 7C16.6737 7 18.9973 8.49902 20.1762 10.7025C20.5695 11.4376 21.2817 12 22.1155 12C23.1563 12 24 11.1563 24 10.1155V7Z"
        fill={color.logo}
      />
      <path
        d="M24 17.8845C24 16.8437 23.1563 16 22.1155 16C21.2817 16 20.5695 16.5624 20.1762 17.2975C18.9973 19.501 16.6737 21 14 21H11.5C10.6716 21 10 21.6716 10 22.5C10 23.3284 10.6716 24 11.5 24H21C22.6569 24 24 22.6569 24 21V17.8845Z"
        fill={color.logo}
      />
    </svg>
  );
};
