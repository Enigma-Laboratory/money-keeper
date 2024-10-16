import { MoreOutlined, SwapRightOutlined } from '@ant-design/icons';
import { Order, defaultDateTimeFormat } from '@enigma-laboratory/shared';
import { Button, Divider, Flex, Typography } from 'antd';
import { BaseOrderStatus } from 'components/order-status';
import dayjs from 'dayjs';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { AuthService, UserCollection } from 'stores';
import { formatCurrencyToVnd, getExactPath, routePaths } from 'utils';
import { StyledName, StyledOrderCard } from './OrderCard.styles';

interface OrderCardProps {
  order: Order;
  users: UserCollection;
}

export const OrderCard = ({ order, users }: OrderCardProps): ReactElement => {
  const { t } = useTranslation('orderDetail', { keyPrefix: 'information' });
  const user = AuthService.instance.getAuth();

  const renderItem = (label: string, value: string | number, copyable: boolean = false) => {
    return (
      <Flex align="start" style={{ minWidth: 200 }}>
        <Typography.Text style={{ fontSize: 12, marginRight: 5 }}>{label}:</Typography.Text>
        <Typography.Paragraph strong copyable={copyable} style={{ margin: 0, fontSize: 12 }}>
          {value}
        </Typography.Paragraph>
      </Flex>
    );
  };

  const totalPriceProduct = useMemo(() => {
    return order.products?.reduce((sum, product) => sum + product.price, 0) || 0;
  }, [order.products]);

  return (
    <StyledOrderCard>
      <Flex wrap="wrap" justify="space-between" gap={50}>
        <Flex gap={20}>
          <Flex justify="center" align="flex-start" vertical>
            {renderItem('id', order._id, true)}
            {renderItem(t('name'), order.name)}
            {renderItem(t('', 'Order number'), `#${order.orderNumber}`)}
          </Flex>
          <Divider type="vertical" style={{ height: 50, margin: 'auto' }} />
          <Flex justify="center" align="flex-start" vertical>
            {renderItem(t('buyer'), users?.[order.userId]?.name)}
            {renderItem(t('', 'Price'), formatCurrencyToVnd(totalPriceProduct))}
            {renderItem(t('', 'Created Order At'), dayjs(order.createdAt).format(defaultDateTimeFormat))}
            {order?.description && renderItem(t('', 'description'), order.description)}
          </Flex>
        </Flex>

        <Flex justify="center" align="center">
          <SwapRightOutlined />
        </Flex>

        <Flex justify="center" gap={30} align="center">
          <ul style={{ margin: 0 }}>
            {Object.entries(order.usersStatus || {}).map(([userId, status]) => {
              return (
                <li key={userId}>
                  <Flex gap={10} justify="space-between">
                    <StyledName $me={userId === user._id}>{users[userId].name}</StyledName>{' '}
                    <BaseOrderStatus style={{ width: 100 }} status={status} />
                  </Flex>
                </li>
              );
            })}
          </ul>
          <Link to={getExactPath(routePaths.detailOrder, { id: order._id })}>
            <Button shape="circle" icon={<MoreOutlined />} />
          </Link>
        </Flex>
      </Flex>
    </StyledOrderCard>
  );
};
