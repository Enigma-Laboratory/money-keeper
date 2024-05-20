import { CheckCircleOutlined, CloseCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { User } from '@enigma-laboratory/shared';
import { Avatar, Card, Col, Flex, Row, Space } from 'antd';
import { BaseButton, BaseOrderStatus } from 'components';
import { useLocalStorage } from 'hooks';
import { AlertModalPayload } from 'interface';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { EVENT_NAME, EventAction, USER_IDENTITY, getExactPath, routePaths } from 'utils';
import { DetailOrderStyled } from './OrderDetail.styles';
import { OrderEventLog } from './detailStatus';
import { OrderInformation } from './information';
import { OrderDetailActions } from './orderDetailActions';
import { OrderProducts } from './products';
import { DetailOrderProps } from './withOrderDetail';

export const OrderDetail = (props: DetailOrderProps): ReactElement => {
  const {
    data: { order, users, operationalSettings },
    dispatch,
  } = props;

  const [user] = useLocalStorage<User>(USER_IDENTITY);
  const { orderNumber } = order || {};

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation('orderDetail');

  const headerCreateOrder = () => {
    return (
      <Flex vertical align="start">
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <Space>
            <BaseButton onClick={() => navigate(-1)} type="link">
              <Avatar shape="circle" size="small" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
            </BaseButton>
            <h3>
              {t('orderDetails')} #{orderNumber}
            </h3>
            <BaseOrderStatus status={order?.usersStatus?.[user._id]} />
          </Space>
          <Space align="end">
            <BaseButton
              onClick={() => {
                navigate(getExactPath(routePaths.editOrder, { id }));
              }}
              icon={<CloseCircleOutlined />}
              danger
            >
              {t('btn.update')}
            </BaseButton>
            <BaseButton
              onClick={() => {
                EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
                  data: { type: 'confirm', content: order?.name },
                  dispatch: {
                    async handleOk() {
                      dispatch.deleteOrder({ _id: id || '' });
                      navigate('/orders');
                    },
                  },
                });
              }}
              type="primary"
              icon={<CheckCircleOutlined />}
            >
              {t('btn.delete')}
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
        <OrderDetailActions order={order} users={users} currentUser={user} dispatch={{ ...dispatch }} />

        <Col xl={15} lg={24} md={24} sm={24} xs={24}>
          <Card>
            <OrderInformation order={order} users={users} operationalSettings={operationalSettings} />
          </Card>
          <Flex style={{ marginTop: 16 }} gap={16} vertical>
            <Card>
              <OrderProducts order={order} users={users} />
            </Card>
          </Flex>
        </Col>

        <OrderEventLog order={order} users={users} />
      </Row>
    </DetailOrderStyled>
  );
};
