import { BellOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { BikeWhiteIcon } from 'assets/icons';
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

export const BaseOrderStatus: React.FC<OrderStatusProps> = ({ status = OrderStatus.PENDING }) => {
  const { t } = useTranslation();
  let color;
  let icon;

  switch (status) {
    case OrderStatus.PENDING:
      color = 'orange';
      icon = <ClockCircleOutlined />;
      break;
    case OrderStatus.CANCELLED:
      color = 'cyan';
      icon = <BellOutlined />;
      break;
    case OrderStatus.CONFIRM:
      color = 'blue';
      icon = <BikeWhiteIcon />;
      break;
    case OrderStatus.DONE:
      color = 'green';
      icon = <CheckCircleOutlined />;
      break;
    case OrderStatus.PROCESSING:
      color = 'red';
      icon = <CloseCircleOutlined />;
      break;
  }

  return (
    <Tag color={color} icon={icon}>
      {t(`enum.orderStatuses.${status}`, status)}
    </Tag>
  );
};
