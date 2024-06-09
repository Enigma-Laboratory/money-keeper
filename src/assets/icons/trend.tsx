import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { SVGProps } from 'react';

export const UpTrendIcon = () => {
  const { token } = theme.useToken();

  return <CaretUpOutlined style={{ color: token.colorSuccess }} />;
};

export const DownTrendIcon = () => {
  const { token } = theme.useToken();

  return <CaretDownOutlined style={{ color: token.colorError }} />;
};

export const UnchangedIcon = (props: SVGProps<SVGSVGElement>) => {
  const { token } = theme.useToken();

  return (
    <span>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path
          d="M1 0C0.447754 0 0 0.447693 0 1C0 1.55231 0.447754 2 1 2H13C13.5522 2 14 1.55231 14 1C14 0.447693 13.5522 0 13 0H1ZM1 6C0.447754 6 0 6.44769 0 7C0 7.55231 0.447754 8 1 8H13C13.5522 8 14 7.55231 14 7C14 6.44769 13.5522 6 13 6H1Z"
          fill={token.colorWarningText}
        />
      </svg>
    </span>
  );
};
