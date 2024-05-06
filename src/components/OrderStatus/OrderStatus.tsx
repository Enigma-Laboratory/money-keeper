import {
  BellOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
// import { OrderStatus } from '@enigma-laboratory/shared';

export enum OrderStatus {
  PENDING = 'pending',
  CANCELLED = 'cancelled',
  PROCESSING = 'processing',
  CONFIRM = 'confirm',
  DONE = 'done',
}

type OrderStatusProps = {
  status?: OrderStatus;
};

export const BaseOrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const { t } = useTranslation('common');
  let color;
  let icon;

  switch (status) {
    case OrderStatus.PENDING:
      color = 'default';
      icon = <ClockCircleOutlined />;
      break;
    case OrderStatus.PROCESSING:
      color = 'gold';
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
      icon = <BellOutlined />;
      status = OrderStatus.CANCELLED;
  }

  return (
    <Tag color={color} icon={icon} style={{ width: '100px', textAlign: 'center' }}>
      {t(`orderStatus.${status}`, status)}
    </Tag>
  );
};
