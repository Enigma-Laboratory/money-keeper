import { FindAllOrderResponse, Order, Product } from '@enigma-laboratory/shared';
import { Flex, Pagination, Space, TableProps, Typography, theme } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE, dashboardStore } from 'stores';
import { StyledDescriptionText, StyledNameText, StyledTable } from './RecentOrder.styles';

type OrderTimelineProps = {
  data: FindAllOrderResponse & { page: number };
  loading: boolean;
  height: number;
};

export interface ColumnProps extends Order {
  key: React.Key;
}

export const RecentOrderTable = ({ data, loading, height }: OrderTimelineProps) => {
  const { token } = theme.useToken();
  const { t } = useTranslation('dashboard');

  const columns: TableProps<ColumnProps>['columns'] = [
    {
      title: t('recentOrderTable.orderNumber'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 100,
      render: (_, record) => (
        <Typography.Link strong style={{ whiteSpace: 'nowrap', color: token.colorTextHeading }}>
          #{record.orderNumber}
        </Typography.Link>
      ),
    },
    {
      title: t('recentOrderTable.name'),
      dataIndex: 'name',
      width: 300,
      key: 'name',
      render: (value, record) => {
        return (
          <>
            <StyledNameText $description={record.description}>{value}</StyledNameText>
            <StyledDescriptionText ellipsis={{ tooltip: record.description }}>
              {record.description}
            </StyledDescriptionText>
          </>
        );
      },
    },
    {
      title: t('recentOrderTable.product'),
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
      title: t('recentOrderTable.amount'),
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

  const dataSource: ColumnProps[] = useMemo(
    () =>
      data.rows.map((item) => ({
        ...item,
        key: item._id,
      })) || [],
    [data.rows],
  );

  const changePage = (page: number) => {
    // console.log(page);
    const store = dashboardStore.getModel();
    dashboardStore.updateModel({
      ...store,
      recentOrderPage: page,
    });
  };

  return (
    <>
      <StyledTable
        columns={columns}
        $bodyHeight={height}
        loading={loading}
        dataSource={dataSource}
        scroll={{ x: 'max-content', y: height }}
        pagination={false}
      />
      <Pagination
        defaultCurrent={data.page}
        defaultPageSize={DEFAULT_DASHBOARD_RECENT_ORDER_PAGE_SIZE}
        onChange={changePage}
        total={data.count}
        style={{ textAlign: 'center', marginTop: 16 }}
      />
    </>
  );
};
