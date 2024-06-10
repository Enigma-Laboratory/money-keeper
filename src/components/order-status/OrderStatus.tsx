import { CheckCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { OrderStatus } from '@enigma-laboratory/shared';
import { Tag } from 'antd';
import { ComponentPropsWithoutRef } from 'react';
import { useTranslation } from 'react-i18next';

interface OrderStatusProps extends ComponentPropsWithoutRef<'div'> {
  status?: OrderStatus;
}

export const BaseOrderStatus: React.FC<OrderStatusProps> = ({ status, ...remaining }) => {
  const { t } = useTranslation('common');
  let color;
  let icon;

  switch (status) {
    case OrderStatus.PROCESSING:
      color = 'blue';
      icon = <SyncOutlined spin />;
      break;
    case OrderStatus.CONFIRM:
      color = 'lime';
      icon = <QuestionCircleOutlined />;
      break;
    case OrderStatus.DONE:
      color = 'green';
      icon = <CheckCircleOutlined />;
      break;
    case OrderStatus.CANCELLED:
      color = 'red';
      icon = <CloseCircleOutlined />;
      break;
    default:
      color = 'red';
      icon = <CloseCircleOutlined />;
      status = OrderStatus.CANCELLED;
  }

  return (
    <div {...remaining}>
      <Tag color={color} icon={icon} style={{ textAlign: 'start', margin: 2, borderRadius: 11 }}>
        {t(`orderStatus.${status}`, status)}
      </Tag>
    </div>
  );
};
