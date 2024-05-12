import { Order, OrderStatus, defaultDateTimeFormat } from '@enigma-laboratory/shared';
import { Col, Flex, Space, Timeline, Typography } from 'antd';
import { BaseOrderStatus, CardWithContent } from 'components';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCollection } from 'stores';

type OrderEventLogProps = {
  order?: Order;
  users: UserCollection;
};

export const OrderEventLog = ({ order, users }: OrderEventLogProps) => {
  const { t } = useTranslation('orderDetail');

  const logStepItems = useMemo(
    () =>
      order?.event.map((event) => {
        const userName = users?.[event.userId]?.name || 'unknown';
        const color =
          event?.status === OrderStatus.DONE ? 'green' : event?.status === OrderStatus.CANCELLED ? 'red' : 'gray';
        return {
          children: (
            <Space direction="vertical" size={0} style={{ width: '100%' }}>
              <Flex justify="space-between">
                <Typography.Text>{dayjs(event.date).format(defaultDateTimeFormat)}</Typography.Text>
                <BaseOrderStatus status={event?.status} />
              </Flex>

              <Typography.Text>
                <Typography.Text strong>{userName}</Typography.Text>{' '}
                {t(`eventLogs.${event?.status || OrderStatus.CANCELLED}.title`)}
              </Typography.Text>
              <Typography.Text type="secondary">
                {t(`eventLogs.${event?.status || OrderStatus.CANCELLED}.description`)}
              </Typography.Text>
            </Space>
          ),
          color,
        };
      }),
    [order, t, users],
  );

  return (
    <Col xl={9} lg={24} md={24} sm={24} xs={24}>
      <CardWithContent
        bodyStyles={{
          minHeight: '418px',
          maxHeight: '600px',
          overflowY: 'auto',
        }}
        title={t('orderEvenLog')}
      >
        <Flex vertical>
          <Timeline items={logStepItems} />
        </Flex>
      </CardWithContent>
    </Col>
  );
};
