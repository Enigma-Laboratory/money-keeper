import { MoreOutlined } from '@ant-design/icons';
import {
  DeleteOneOrderParams,
  Order,
  OrderStatus,
  UpdateOneOrderParams,
  UpdateOrderEventParams,
} from '@enigma-laboratory/shared';
import { Avatar, Button, Card, Col, Dropdown, Flex, Space, Typography } from 'antd';
import { ButtonStatus } from 'components';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCollection } from 'stores';
import { generateColorFromAlphabet } from 'utils';

type OrderDetailActionsProps = {
  order: Order;
  users: UserCollection;
  dispatch: {
    updateOrder: (params: UpdateOneOrderParams) => Promise<void>;
    deleteOrder: (params: DeleteOneOrderParams) => Promise<void>;
    updateOrderStatus: (params: UpdateOrderEventParams) => Promise<void>;
  };
};

export const OrderDetailActions = ({ order, users, dispatch }: OrderDetailActionsProps) => {
  const { t } = useTranslation('orderDetail');
  const { t: tCommon } = useTranslation('common');

  const { userIds } = useMemo(() => {
    const userIds = order?.products?.flatMap(({ userIds }) => userIds) || [];
    const uniqueUserIds = [...new Set(userIds)];

    return {
      userIds: uniqueUserIds,
    };
  }, [order]);
  return (
    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
      <Flex gap={16} vertical>
        <Card>
          <Flex justify="space-between">
            <Flex align="center" gap={10}>
              <Avatar.Group maxCount={5} maxPopoverTrigger="click" size="large">
                {userIds.map((uniqueUserId, index) => {
                  const { name = 'unknown' } = users[uniqueUserId] || {};
                  return (
                    <Avatar key={index} style={{ backgroundColor: generateColorFromAlphabet(name.charAt(0)) }}>
                      {name}
                    </Avatar>
                  );
                })}
              </Avatar.Group>
              <Typography.Text keyboard>
                <Typography.Text strong>{t('information.createdOrderAt')} :</Typography.Text>
                {dayjs(order?.createdOrderAt).format('DD/MM/YYYY HH:mm:ss')}
              </Typography.Text>
            </Flex>
            <div>
              <Space>
                {order?.status && <ButtonStatus status={order.status} />}

                <Dropdown
                  menu={{
                    items: Object.values(OrderStatus).map((key) => ({ label: tCommon(`orderStatus.${key}`), key })),
                    selectable: true,
                    defaultSelectedKeys: [order?.status],
                    onClick: (e) =>
                      dispatch.updateOrderStatus({
                        status: e.key,
                        orderId: order._id,
                      } as UpdateOrderEventParams),
                  }}
                >
                  <Space>
                    <Button icon={<MoreOutlined />} />
                  </Space>
                </Dropdown>
              </Space>
            </div>
          </Flex>
        </Card>
      </Flex>
    </Col>
  );
};
