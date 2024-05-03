import { Flex, Grid, List, Space, Steps, Typography, theme } from 'antd';
import dayjs from 'dayjs';
import {
  ClockCircleOutlined,
  HistoryOutlined,
  LoadingOutlined,
  PhoneOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useMemo } from 'react';
import { IOrder } from 'interface';
import { useTranslation } from 'react-i18next';
import { useConfigProvider } from 'context';
import { BikeWhiteIcon } from 'assets/icons';

type Props = {
  order: IOrder;
};

export const OrderDetailStatus = ({ order }: Props) => {
  const { t } = useTranslation();
  const { token } = theme.useToken();
  const breakpoints = Grid.useBreakpoint();
  const { mode } = useConfigProvider();

  const details = useMemo(() => {
    const list: {
      icon: React.ReactNode;
      title: string;
      description: string;
    }[] = [
      {
        icon: <ClockCircleOutlined />,
        title: t('orders.fields.deliveryTime'),
        description: dayjs(order.events[0]?.date)
          .add(60, 'minutes')
          .format('hh:mm A'),
      },
      {
        icon: <ShopOutlined />,
        title: t('orders.fields.store'),
        description: order.store.title,
      },
      {
        icon: <BikeWhiteIcon />,
        title: t('orders.fields.courier'),
        description: order.courier?.name,
      },
      {
        icon: <PhoneOutlined />,
        title: t('orders.fields.phone'),
        description: order.courier?.gsm,
      },
      {
        icon: <UserOutlined />,
        title: t('orders.fields.customer'),
        description: `${order.user.firstName} ${order.user.lastName}`,
      },
      {
        icon: <HistoryOutlined />,
        title: t('orders.fields.createdAt'),
        description: order.createdAt,
      },
    ];

    return list;
  }, [order]);

  return (
    <Flex vertical>
      <Steps
        direction={breakpoints.xl ? 'vertical' : 'horizontal'}
        current={getCurrentStep(order)}
        style={{
          padding: '24px',
        }}
      >
        {order?.events.map((event, index) => {
          const status = getStepStatus(order, event, index);
          const isLast = index === order?.events.length - 1;

          return (
            <Steps.Step
              key={index}
              style={{
                paddingBottom: isLast ? '0' : '24px',
              }}
              status={status}
              title={t(`enum.orderStatuses.${event.status}`)}
              icon={<LoadingOutlined />}
              description={
                event.date && (
                  <Flex wrap={'wrap'} gap={4}>
                    <div>{dayjs(event.date).format('L')}</div>
                    <div>{dayjs(event.date).format('LT')}</div>
                  </Flex>
                )
              }
            />
          );
        })}
      </Steps>
      <List
        size="large"
        dataSource={details}
        style={{
          borderTop: `1px solid ${token.colorBorderSecondary}`,
        }}
        renderItem={(item) => (
          <List.Item>
            <Flex gap={8}>
              <Space
                style={{
                  width: '120px',
                }}
              >
                <div
                  style={{
                    color: mode === 'dark' ? token.volcano9 : token.volcano6,
                  }}
                >
                  {item.icon}
                </div>
                <Typography.Text type="secondary">{item.title}</Typography.Text>
              </Space>
              <Typography.Text>{item.description}</Typography.Text>
            </Flex>
          </List.Item>
        )}
      />
    </Flex>
  );
};

const getCurrentStep = (order: IOrder) => {
  return order?.events.findIndex((el) => el.status === order?.status?.text);
};

const getStepStatus = (order: IOrder, event: any, index: number) => {
  if (!event.date) return 'wait';
  if (event.status === 'Cancelled') return 'error';
  return 'finish';
};
