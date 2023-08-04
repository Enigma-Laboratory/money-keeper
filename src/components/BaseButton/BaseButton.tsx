import React from 'react';
import { BaseButtonStyled } from './BaseButton.styles';
import { ButtonProps } from 'antd';

export interface BaseButtonProps extends ButtonProps {}

export const BaseButton = (props: BaseButtonProps) => {
  const { children, ...rest } = props;
  return <BaseButtonStyled {...rest}>{children}</BaseButtonStyled>;
};
