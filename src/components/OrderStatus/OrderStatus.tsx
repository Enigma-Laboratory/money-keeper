import { BellOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useTranslation } from 'react-i18next';
import { BikeWhiteIcon } from 'assets/icons';

type OrderStatusProps = {
  status: 'Pending' | 'Ready' | 'On The Way' | 'Delivered' | 'Cancelled';
};

export const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
  const { t } = useTranslation();
  let color;
  let icon;

  switch (status) {
    case 'Pending':
      color = 'orange';
      icon = <ClockCircleOutlined />;
      break;
    case 'Ready':
      color = 'cyan';
      icon = <BellOutlined />;
      break;
    case 'On The Way':
      color = 'blue';
      icon = <BikeWhiteIcon />;
      break;
    case 'Delivered':
      color = 'green';
      icon = <CheckCircleOutlined />;
      break;
    case 'Cancelled':
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
