import React, { ReactElement } from 'react';
import { IOrder, IProduct } from 'interface';
import { Flex, Table, TableProps, Typography } from 'antd';

type Props = {
  order?: IOrder;
};

export const OrderProducts = ({ order }: Props): ReactElement => {
  const products = order?.products || [];
  const columns: TableProps<IProduct>['columns'] = [
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
      title: 'quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (value) => <p>1</p>,
    },
    // {
    //   title: t('orders.fields.products', 'Products'),
    //   dataIndex: 'products',
    //   key: 'products',
    // },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => <Typography.Text>{value}VND</Typography.Text>,
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (value) => <p>100</p>,
    },
  ];

  return (
    <Table
      dataSource={products}
      columns={columns}
      footer={(products) => {
        return (
          <Flex justify="flex-end" gap={16}>
            <Typography.Text>Total</Typography.Text>
            <Typography.Text>{products.reduce((acc, product) => acc + product.price, 0)} VND</Typography.Text>
          </Flex>
        );
      }}
    />
  );
};
