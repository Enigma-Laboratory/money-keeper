import { CheckCircleOutlined, CloseCircleOutlined, LeftOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, Dropdown, Flex, Row, Space, Typography } from 'antd';
import { BaseButton, BaseOrderStatus, CardWithContent } from 'components';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { routePaths } from 'routes';
import { generateColorFromAlphabet, getExactPath } from 'utils';
import { DetailOrderStyled } from './OrderDetail.styles';
import { OrderEventLog } from './detailStatus';
import { OrderInformation } from './information';
import { OrderProducts } from './products';
import { DetailOrderProps } from './withOrderDetail';

export const OrderDetail = (props: DetailOrderProps): ReactElement => {
  const {
    data: { order, users },
    dispatch,
  } = props;

  const { orderNumber, status } = order || {};
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const { userIds } = useMemo(() => {
    const userIds = order?.products?.flatMap(({ userIds }) => userIds) || [];
    const uniqueUserIds = [...new Set(userIds)];

    return {
      userIds: uniqueUserIds,
    };
  }, [order]);

  const headerCreateOrder = () => {
    return (
      <Flex vertical align="start">
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <Space>
            <BaseButton onClick={() => navigate(-1)} type="link">
              <Avatar shape="circle" size="small" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
            </BaseButton>
            <h3>Order details #{orderNumber}</h3>
            <BaseOrderStatus status={status} />
          </Space>
          <Space align="end">
            <BaseButton
              onClick={() => {
                dispatch.deleteOrder({ _id: id || '' });
              }}
              icon={<CloseCircleOutlined />}
              danger
            >
              Update
            </BaseButton>
            <BaseButton
              onClick={() => {
                navigate(getExactPath(routePaths.editOrder, { id }));
              }}
              type="primary"
              icon={<CheckCircleOutlined />}
            >
              Delete
            </BaseButton>
          </Space>
        </Flex>
      </Flex>
    );
  };

  return (
    <DetailOrderStyled>
      {headerCreateOrder()}
      <Row gutter={[16, 16]}>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Flex gap={16} vertical>
            <Card>
              <Flex justify="space-between">
                <Flex align="center" gap={10}>
                  <Avatar.Group maxCount={5} maxPopoverTrigger="click" size="large">
                    {userIds.map((uniqueUserId) => {
                      const { _id, name } = users[uniqueUserId] || {};
                      if (!name || !_id) return <>__</>;
                      return (
                        <Avatar key={_id} style={{ backgroundColor: generateColorFromAlphabet(name.charAt(0)) }}>
                          {name}
                        </Avatar>
                      );
                    })}
                  </Avatar.Group>
                  <Typography.Text keyboard>
                    <Typography.Text strong>Created Order At:</Typography.Text>
                    {order?.createdOrderAt?.toString()}
                  </Typography.Text>
                </Flex>
                <div>
                  <Dropdown.Button
                    icon={<MoreOutlined />}
                    menu={{
                      items: [
                        {
                          label: '1st menu item',
                          key: '1',
                        },
                        {
                          label: '2nd menu item',
                          key: '2',
                        },
                      ],
                    }}
                    danger
                  >
                    Confirm
                  </Dropdown.Button>
                </div>
              </Flex>
            </Card>
          </Flex>
        </Col>

        <Col xl={15} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <OrderInformation order={order} users={users} />
          </Card>
          <Flex style={{ marginTop: 16 }} gap={16} vertical>
            <Card>
              <OrderProducts order={order} users={users} />
            </Card>
          </Flex>
        </Col>

        <Col xl={9} lg={24} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              minHeight: '418px',
              maxHeight: '600px',
              overflowY: 'auto',
            }}
            title={t('orders.titles.orderEvenLog')}
          >
            <OrderEventLog order={order} users={users} />
          </CardWithContent>
        </Col>
      </Row>
    </DetailOrderStyled>
  );
};
