import { ButtonProps } from 'antd';
import { StyledButtonStatus } from './ButtonStatus.styles';

interface ButtonStatusProps extends ButtonProps {}

export const ButtonStatus = (props: ButtonProps) => {
  const { ...remaining } = props;

  return <StyledButtonStatus {...remaining} />;
};
