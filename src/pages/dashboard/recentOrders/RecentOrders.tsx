import { Flex, Space, Table, TableProps, Typography, theme } from 'antd';
import { IOrder } from 'interfaces';
import { OrderActions } from './OrderAction';

type OrderTimelineProps = {
  data: {
    orders?: IOrder[];
    height?: string;
  };
  dispatch: object;
};

// interface DataType {
//   key: string;
//   orderNumber: string;
//   age: number;
//   address: string;
//   tags: string[];
// }

export const RecentOrders = ({ data }: OrderTimelineProps) => {
  const { orders } = data;

  const { token } = theme.useToken();

  const columns: TableProps<IOrder>['columns'] = [
    {
      title: 'orderNumber',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      align: 'center',
      width: 150,
      render: (_, record) => (
        <Typography.Link
          strong
          onClick={() => console.log('redirect to order')}
          style={{
            whiteSpace: 'nowrap',
            color: token.colorTextHeading,
          }}
        >
          #{record.orderNumber}
        </Typography.Link>
      ),
    },

    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '30%',
      render: (_, record) => {
        return (
          <Space
            size={0}
            direction="vertical"
            style={{
              maxWidth: '220px',
            }}
          >
            <Typography.Text
              style={{
                fontSize: 14,
              }}
            >
              {record?.user?.firstName} {record?.user?.lastName}
            </Typography.Text>
            <Typography.Text
              ellipsis
              style={{
                fontSize: 12,
              }}
              type="secondary"
            >
              {record?.user?.addresses?.[0]?.text}
            </Typography.Text>
          </Space>
        );
      },
    },
    {
      title: 'product',
      dataIndex: 'products',
      key: 'product',
      width: '20%',
      render: (products: IOrder['products']) => {
        if (!products.length) {
          return <Typography.Text>-</Typography.Text>;
        }

        return (
          <Space
            size={0}
            direction="vertical"
            style={{
              maxWidth: '220px',
            }}
          >
            {products.map((product) => (
              <Flex key={product.id} gap={4}>
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
      width: 150,
      render: (amount) => {
        return (
          <Typography.Text>
            {(amount / 100).toLocaleString('us', { style: 'currency', currency: 'USD' })}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Action',
      key: 'actions',
      fixed: 'right',
      align: 'center',
      width: 150,
      render: (_, record) => <OrderActions record={record} />,
    },
  ];

  return <Table columns={columns} dataSource={orders} scroll={{ x: 850, y: 300 }} />;
};
