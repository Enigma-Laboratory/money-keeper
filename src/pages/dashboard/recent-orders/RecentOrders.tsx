import { Order, Product } from '@enigma-laboratory/shared';
import { Flex, Pagination, Space, Table, TableProps, Typography, theme } from 'antd';
import { RecentOrder } from 'stores/dashboard';

type OrderTimelineProps = {
  data: RecentOrder;
  loading: boolean;
  dispatch?: {
    fetchRecentOrder: (page: number, pageSize?: number) => Promise<void>;
  };
};

interface ColumnProps extends Order {
  key?: string;
}

export const RecentOrderChart = ({ data, dispatch, loading }: OrderTimelineProps) => {
  const { token } = theme.useToken();
  const columns: TableProps<ColumnProps>['columns'] = [
    {
      title: 'Order Number',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 140,
      render: (_, record) => (
        <Typography.Link strong style={{ whiteSpace: 'nowrap', color: token.colorTextHeading }}>
          #{record.orderNumber}
        </Typography.Link>
      ),
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: (value) => <Typography.Text style={{ fontSize: 14 }}>{value}</Typography.Text>,
    },
    {
      title: 'Product',
      dataIndex: 'products',
      key: 'products',
      width: 200,
      render: (products) => {
        if (!products.length) return <Typography.Text>__</Typography.Text>;
        return (
          <Space size={0} direction="vertical">
            {products.map((product: Product) => (
              <Flex key={product._id} gap={4}>
                <Typography.Text ellipsis>{product.name}</Typography.Text>
              </Flex>
            ))}
          </Space>
        );
      },
    },
    {
      title: 'amount',
      key: 'amount',
      dataIndex: 'amount',
      width: 100,
      render: (amount) => {
        if (!amount) return <Typography.Text>__</Typography.Text>;
        return (
          <Typography.Text>
            {(amount / 100).toLocaleString('us', { style: 'currency', currency: 'USD' })}
          </Typography.Text>
        );
      },
    },
  ];
  return (
    <>
      <Table
        loading={loading}
        columns={columns}
        dataSource={data.data?.[data.page] || []}
        scroll={{ x: 850, y: 300 }}
        pagination={false}
      />
      <Pagination
        defaultCurrent={data.page}
        defaultPageSize={data.pageSize}
        onChange={(page) =>
          dispatch?.fetchRecentOrder(page) || ((): Promise<void> => new Promise((resolve) => resolve()))
        }
        total={data.count}
        style={{ textAlign: 'center', marginTop: 16 }}
      />
    </>
  );
};
