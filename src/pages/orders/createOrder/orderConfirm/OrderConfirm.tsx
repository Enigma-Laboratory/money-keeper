import { OperationalSetting, Order, User } from '@enigma-laboratory/shared';
import { Avatar, Divider, Flex, Tag, Typography } from 'antd';
import { ReactElement, useMemo } from 'react';
import { arrayToObject, generateColorFromAlphabet } from 'utils';
import { StyledOrderConfirm } from './OrderConfirm.styles';

type OrderConfirmProps = {
  order: Order;
  users: User[];
  operationalSettings: OperationalSetting[];
};

export const OrderConfirm = ({ order, users, operationalSettings }: OrderConfirmProps): ReactElement => {
  const {
    createdOrderAt,
    total,
    groupId,
    products,
    uniqueUserIds,
    arrayToOjectUsers,
    arrayToOjectOperationalSettings,
  } = useMemo(() => {
    const sumPrice = order.products?.reduce((sum, product) => sum + product.price, 0) || 0;
    const userIds = order?.products?.flatMap(({ userIds }) => userIds) || [];

    const uniqueUserIds = [...new Set(userIds)];

    return {
      createdOrderAt: order.createdOrderAt,
      total: sumPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
      uniqueUserIds,
      products: order.products || [],
      arrayToOjectUsers: arrayToObject(users, '_id'),
      arrayToOjectOperationalSettings: arrayToObject(operationalSettings, '_id'),
      groupId: order.groupId || '',
    };
  }, [order, users, operationalSettings]);

  return (
    <StyledOrderConfirm>
      <Flex justify="space-between" align="center" gap={10} className="item">
        <Typography.Title style={{ margin: 0 }} level={3}>
          Payment
        </Typography.Title>
        <Typography.Text type="secondary">{createdOrderAt?.toString()}</Typography.Text>
      </Flex>

      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text>Name:</Typography.Text>
        <Typography.Text>{arrayToOjectOperationalSettings[groupId]?.name}</Typography.Text>
      </Flex>
      <Divider />

      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text style={{ minWidth: 100 }}>Products:</Typography.Text>
        <div>
          <Flex gap="7px 0" wrap="wrap">
            {products.map((product, index) => {
              return (
                <Tag key={index} color={generateColorFromAlphabet(product.name.charAt(0))}>
                  {product.name}
                </Tag>
              );
            })}
          </Flex>
        </div>
      </Flex>
      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text style={{ minWidth: 100 }}>Users:</Typography.Text>
        <div>
          <Flex gap="4px 0" wrap="wrap">
            <Avatar.Group maxCount={7} maxPopoverTrigger="click" size="large">
              {uniqueUserIds.map((uniqueUserId) => {
                const { _id, name } = arrayToOjectUsers[uniqueUserId];

                return (
                  <Avatar key={_id} style={{ backgroundColor: generateColorFromAlphabet(name.charAt(0)) }}>
                    {name}
                  </Avatar>
                );
              })}
            </Avatar.Group>
          </Flex>
        </div>
      </Flex>
      <Divider />
      <Flex justify="space-between" gap={10} className="item">
        <Typography.Text>Total:</Typography.Text>
        <Typography.Text>{total}</Typography.Text>
      </Flex>
    </StyledOrderConfirm>
  );
};
