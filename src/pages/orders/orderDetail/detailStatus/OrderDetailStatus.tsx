import { Order, OrderStatus, User, defaultDateTimeFormat } from '@enigma-laboratory/shared';
import { Flex, Space, Timeline, Typography } from 'antd';
import { BaseOrderStatus } from 'components';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type Props = {
  order?: Order;
  users: Record<string, User>;
};

export const OrderEventLog = ({ order, users }: Props) => {
  const logStepItems = useMemo(
    () =>
      order?.event.map((event) => {
        const userName = users?.[event.userId]?.name || 'unknown';

        let title = `cancelled the order.`;
        let description = `The order is now closed and can no longer be modified.`;
        let color = `red`;

        switch (event.status) {
          case OrderStatus.PROCESSING:
            title = `created an order.`;
            description = `The order is currently being processed.`;
            color = 'gray';
            break;
          case OrderStatus.CONFIRM:
            title = `changed the status to confirm.`;
            description = `The order has been confirmed and is now awaiting fulfillment.`;
            color = '#4466e3';
            break;
          case OrderStatus.DONE:
            title = `changed the status to done.`;
            description = ` The order has been successfully completed.`;
            color = 'green';
            break;
          case OrderStatus.CANCELLED:
          default:
            break;
        }

        return {
          children: (
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              <Flex justify="space-between">
                <Typography.Text>{dayjs(event.date).format(defaultDateTimeFormat)}</Typography.Text>
                <BaseOrderStatus status={event.status} />
              </Flex>

              <Typography.Text>
                <Typography.Text strong>{userName}</Typography.Text> {title}
              </Typography.Text>
              <Typography.Text type="secondary">{description}</Typography.Text>
            </Space>
          ),
          color,
        };
      }),
    [order, users],
  );

  return (
    <Flex vertical>
      <Timeline items={logStepItems} />
    </Flex>
  );
};
