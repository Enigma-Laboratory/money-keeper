import { Order, Product, User } from '@enigma-laboratory/shared';
import { Avatar, Flex, Table, TableProps, Typography } from 'antd';
import { Fragment, ReactElement } from 'react';
import { formatCurrencyToVnd, generateColorFromAlphabet } from 'utils';

type Props = {
  order?: Order;
  users: Record<string, User>;
};

export const OrderProducts = ({ order, users }: Props): ReactElement => {
  const products = order?.products || [];
  const columns: TableProps<Product>['columns'] = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (value) => (
        <Typography.Text
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          {value}
        </Typography.Text>
      ),
    },
    {
      title: 'userIds',
      dataIndex: 'userIds',
      key: 'userIds',
      render: (userIds: string[]) => (
        <>
          {userIds.map((userId) => {
            const { _id, name } = users[userId] || {};
            if (!name || !_id) return <Fragment key={userId} />;
            return (
              <Avatar key={_id} style={{ backgroundColor: generateColorFromAlphabet(name.charAt(0)) }}>
                {name}
              </Avatar>
            );
          })}
        </>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => <Typography.Text>{formatCurrencyToVnd(value)}</Typography.Text>,
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      pagination={false}
      footer={(products) => {
        return (
          <Flex justify="flex-end" gap={16}>
            <Typography.Text>Total</Typography.Text>
            <Typography.Text>
              {formatCurrencyToVnd(products.reduce((acc, product) => acc + product.price, 0))}
            </Typography.Text>
          </Flex>
        );
      }}
    />
  );
};
