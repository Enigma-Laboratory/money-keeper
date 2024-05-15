import { Order } from '@enigma-laboratory/shared';
import { Flex, Space, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { OperationalSettingCollection, UserCollection } from 'stores';
import { StyledOrderInformation } from './OrderInformation.styles';

type OrderInformationProps = {
  order: Order;
  users: UserCollection;
  operationalSettings: OperationalSettingCollection;
};

export const OrderInformation = ({ order, users, operationalSettings }: OrderInformationProps) => {
  const { _id, name, groupId, description, userId } = order || {};
  const { t } = useTranslation('orderDetail', { keyPrefix: 'information' });
  return (
    <StyledOrderInformation>
      <Flex wrap="wrap" justify="space-between" gap={50}>
        <Space direction="vertical">
          <Space direction="vertical">
            <Typography.Text>id</Typography.Text>

            <Typography.Paragraph strong copyable>
              {_id}
            </Typography.Paragraph>
          </Space>
          <Space direction="vertical">
            <Typography.Text>{t('name')}</Typography.Text>
            <Typography.Text strong>{name}</Typography.Text>
          </Space>

          <Space direction="vertical">
            <Typography.Text>{t('buyer')}</Typography.Text>
            <Typography.Text strong>{users?.[userId]?.name}</Typography.Text>
          </Space>
        </Space>

        <Space direction="vertical">
          <Space direction="vertical">
            <Typography.Text>{t('groupName')}</Typography.Text>
            <Typography.Text strong>{operationalSettings?.[groupId]?.name}</Typography.Text>
          </Space>

          {description && (
            <Space direction="vertical">
              <Typography.Text>{t('description')}</Typography.Text>
              <Typography.Text strong>{description}</Typography.Text>
            </Space>
          )}
        </Space>
      </Flex>
    </StyledOrderInformation>
  );
};
