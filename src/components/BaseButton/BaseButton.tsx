import { ButtonProps } from 'antd';
import { BaseButtonStyled } from './BaseButton.styles';

export interface BaseButtonProps extends ButtonProps {}

export const BaseButton = (props: BaseButtonProps) => {
  const { children, ...rest } = props;
  return <BaseButtonStyled {...rest}>{children}</BaseButtonStyled>;
};
