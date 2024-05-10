import { Order, User } from '@enigma-laboratory/shared';
import { Flex, Space, Typography } from 'antd';
import { StyledOrderInformation } from './OrderInformation.styles';

type OrderInformationProps = {
  order: Order;
  users: Record<string, User>;
};

export const OrderInformation = ({ order, users }: OrderInformationProps) => {
  const { _id, name, groupId, description, userId } = order || {};
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
            <Typography.Text>Name</Typography.Text>
            <Typography.Text strong>{name}</Typography.Text>
          </Space>

          <Space direction="vertical">
            <Typography.Text>Buyer</Typography.Text>
            <Typography.Text strong>{users?.[userId]?.name}</Typography.Text>
          </Space>
        </Space>

        <Space direction="vertical">
          <Space direction="vertical">
            <Typography.Text>Status</Typography.Text>
            <Typography.Text strong>Confirm</Typography.Text>
          </Space>
          <Space direction="vertical">
            <Typography.Text>Group name</Typography.Text>
            <Typography.Text strong>{groupId}</Typography.Text>
          </Space>

          {description && (
            <Space direction="vertical">
              <Typography.Text>Description</Typography.Text>
              <Typography.Text strong>{description}</Typography.Text>
            </Space>
          )}
        </Space>
      </Flex>
    </StyledOrderInformation>
  );
};
