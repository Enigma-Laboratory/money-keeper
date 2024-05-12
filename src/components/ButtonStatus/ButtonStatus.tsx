import { OrderStatus } from '@enigma-laboratory/shared';
import { ButtonProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { StyledButtonStatus } from './ButtonStatus.styles';

interface ButtonStatusProps extends ButtonProps {
  status: OrderStatus;
}

export const ButtonStatus = (props: ButtonStatusProps) => {
  const { status, style, ...remaining } = props;
  const { t } = useTranslation('common');
  let color;

  switch (status) {
    case OrderStatus.PROCESSING:
      color = 'blue';
      break;
    case OrderStatus.CONFIRM:
      color = 'lime';
      break;
    case OrderStatus.DONE:
      color = 'green';
      break;
    case OrderStatus.CANCELLED:
      color = 'red';
      break;
    default:
      color = 'red';
  }

  return (
    <StyledButtonStatus style={{ background: color, width: 100, ...style }} {...remaining}>
      {t(`orderStatus.${status}`, status)}
    </StyledButtonStatus>
  );
};
