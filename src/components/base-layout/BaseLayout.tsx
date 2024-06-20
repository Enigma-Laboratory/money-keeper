import { LayoutProps } from 'antd';
import { ReactElement } from 'react';
import { BaseLayoutStyled } from './BaseLayout.styles';

export interface BaseLayoutProps extends LayoutProps {}

export const BaseLayout = (props: BaseLayoutProps): ReactElement => {
  const { children, ...rest } = props;
  return <BaseLayoutStyled {...rest}>{children}</BaseLayoutStyled>;
};
