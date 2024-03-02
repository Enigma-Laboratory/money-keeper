import { ReactElement } from 'react';
import { DetailOrderStyled } from './DetailOrder.styles';
import { DetailOrderProps } from './withDetailOrder';
import { Avatar, Breadcrumb, Card, Descriptions, Space, Spin, Table, Tag } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AppstoreOutlined, LeftOutlined } from '@ant-design/icons';
import { BaseButton } from 'components';
import { ColumnsType } from 'antd/es/table';
import { getExactPath } from 'utils/getExactPath';
import { routePaths } from 'routes/routeComponent';

interface DataType {
  key: string;
  user: string;
  name: string;
  createdAt: Date;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Product',
    dataIndex: 'product',
    width: '30%',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Created At',
    dataIndex: 'createdAt',
  },
];

export const DetailOrder = (props: DetailOrderProps): ReactElement => {
  const {
    data: { order },
    dispatch,
  } = props;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const breadcrumb = () => {
    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>
          <AppstoreOutlined /> Order
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to={'/order'}>List</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Edit Order</Breadcrumb.Item>
      </Breadcrumb>
    );
  };
  const headerCreateOrder = () => {
    return (
      <Space>
        <BaseButton onClick={() => navigate(-1)} type="link">
          <Avatar shape="circle" size="small" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
        </BaseButton>
        <Space align="end">
          <BaseButton
            onClick={() => {
              dispatch.deleteOrder({ id });
            }}
          >
            Delete
          </BaseButton>
          <BaseButton
            onClick={() => {
              navigate(getExactPath(routePaths.editOrder, { id }));
            }}
            type="primary"
          >
            Update
          </BaseButton>
        </Space>
      </Space>
    );
  };

  return (
    <DetailOrderStyled>
      {breadcrumb()}

      <Card title={headerCreateOrder()}>
        <Card>
          <Descriptions title={order?.id} column={1}>
            <Descriptions.Item label="User">Tu Tuan Le</Descriptions.Item>
            <Descriptions.Item label="name">{order?.orderName}</Descriptions.Item>
            <Descriptions.Item label="created At">{order?.createdAt?.toString()}</Descriptions.Item>
            <Descriptions.Item label="Remark">
              <Tag color="red">Not Resolve</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
        <Card
          style={{ marginTop: 16 }}
          title="Order Detail"
          size="default"
          extra={
            <Space align="end">
              <BaseButton onClick={() => {}}>Delete</BaseButton>
              <BaseButton onClick={() => {}} type="primary">
                Update
              </BaseButton>
            </Space>
          }
        >
          <Spin spinning={false}>
            <Table columns={columns} dataSource={[]} />
          </Spin>
        </Card>
      </Card>
    </DetailOrderStyled>
  );
};
