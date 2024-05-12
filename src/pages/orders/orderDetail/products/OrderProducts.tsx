import { Order, Product } from '@enigma-laboratory/shared';
import { Avatar, Flex, Table, TableProps, Typography } from 'antd';
import { Fragment, ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { UserCollection } from 'stores';
import { formatCurrencyToVnd, generateColorFromAlphabet } from 'utils';

type Props = {
  order?: Order;
  users: UserCollection;
};

export const OrderProducts = ({ order, users }: Props): ReactElement => {
  const products = order?.products || [];

  const { t } = useTranslation('orderDetail');

  const columns: TableProps<Product>['columns'] = [
    {
      title: t('product.name'),
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
      title: t('product.userIds'),
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
      title: t('product.price'),
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
            <Typography.Text>{t('product.total')}:</Typography.Text>
            <Typography.Text>
              {formatCurrencyToVnd(products.reduce((acc, product) => acc + product.price, 0))}
            </Typography.Text>
          </Flex>
        );
      }}
    />
  );
};
