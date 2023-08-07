import { ReactElement, useMemo } from 'react';
import React from 'react';
import { Breadcrumb, Space, Spin, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { OrderProps } from './withOrderController';
import { OrderStyled } from './Order.styles';
import { AppstoreOutlined } from '@ant-design/icons';
import Search from 'antd/es/input/Search';
import { BaseButton } from 'components';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'routes/routeComponent';
import { getExactPath } from 'utils/getExactPath';

interface DataType {
  key: string;
  user: string;
  name: string;
  createdAt: Date;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe',
      },
      {
        text: 'Category 1',
        value: 'Category 1',
      },
      {
        text: 'Category 2',
        value: 'Category 2',
      },
    ],
    filterMode: 'tree',
    filterSearch: true,
    width: '30%',
  },
  {
    title: 'user',
    dataIndex: 'user',
  },
  {
    title: 'createdAt',
    dataIndex: 'createdAt',
  },
];

export const Order = (props: OrderProps): ReactElement => {
  const { data } = props;
  const { isLoading = true, orders = [] } = data || {};
  const navigate = useNavigate();
  const dataSource: DataType[] = useMemo(
    () =>
      orders.map(order => {
        return {
          key: order.id,
          user: order.userId,
          name: order.orderName,
          createdAt: order.createdAt,
        };
      }),
    [orders],
  );

  const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const breadcrumb = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <AppstoreOutlined /> Order
        </Breadcrumb.Item>
        <Breadcrumb.Item>List</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  const headerOrder = () => {
    const onSearch = (value: string) => console.log(value);
    return (
      <Space>
        <Search placeholder="input search text" onSearch={onSearch} enterButton />

        <BaseButton onClick={() => navigate(routePaths.createOrder)} type="primary">
          Create
        </BaseButton>
      </Space>
    );
  };
  const handleClickDetailOrder = (record: any) => {
    navigate(getExactPath(routePaths.detailOrder, { id: record?.key }));
  };

  return (
    <OrderStyled>
      {breadcrumb()}
      {headerOrder()}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          onChange={onChange}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                handleClickDetailOrder(record);
              },
              className: 'pointer-cursor',
            };
          }}
        />
      </Spin>
    </OrderStyled>
  );
};
