import { OrderStatus } from '@enigma-laboratory/shared';
import { ButtonProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { StyledButtonStatus } from './ButtonStatus.styles';

interface ButtonStatusProps extends ButtonProps {
  status: OrderStatus;
}

export const ButtonStatus = (props: ButtonStatusProps) => {
  const { status = OrderStatus.CANCELLED, ...remaining } = props;
  const { t } = useTranslation('common');

  return (
    <StyledButtonStatus status={status} {...remaining}>
      {t(`orderStatus.${status}`, status)}
    </StyledButtonStatus>
  );
};
