import { InsertRowRightOutlined } from '@ant-design/icons';
import { OperationalSetting, Order, OrderStatus, defaultDateTimeFormat } from '@enigma-laboratory/shared';
import { Button, Progress, Space, Spin, Switch, Table, Typography, theme } from 'antd';
import type { TableProps } from 'antd/es/table';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { OrderCard } from 'components';
import { DEFAULT_PARAMS, THC, formatCurrencyToVnd, getExactPath, routePaths } from 'utils';

import { StyledOperationalSetting } from './OperationalSetting.styles';
import { Drawer, OperationalSettingData } from './operational-setting-drawer';
import { OperationalSettingProps } from './withOperationalSettingController';

export interface OperationalSettingWithOrders extends OperationalSetting {
  orders?: Order[];
  key: React.Key;
}

const TABLE_HEIGHT =
  window.innerHeight -
  THC.HEADER_HEIGHT -
  THC.PADDING_MAIN_LAYOUT_HEIGHT * 2 -
  THC.ORDER_PAGE.HEADER_HEIGHT -
  THC.ORDER_PAGE.HEADER_MARGIN -
  THC.ORDER_PAGE.PAGINATION_HEIGHT -
  THC.ORDER_PAGE.PAGINATION_MARGIN * 2 -
  THC.ORDER_PAGE.HEADER_TABLE;

export const OperationalSettings = (props: OperationalSettingProps): ReactElement => {
  const { data, dispatch } = props;
  const { isLoading, statusLoading, groupOrders, operationalSettings, users } = data;
  const { handleUpdateOrderStatus } = dispatch;
  const navigate = useNavigate();

  const { token } = theme.useToken();
  const { t } = useTranslation('order');

  const [drawerData, setDrawerData] = useState<Partial<OperationalSettingData>>({
    isOpen: false,
    statusLoading,
    users,
  });

  useEffect(() => {
    setDrawerData((prevDrawerData) => {
      const updatedStatus = operationalSettings?.[prevDrawerData?._id || '']?.status;
      return { ...prevDrawerData, users, statusLoading, status: updatedStatus };
    });
  }, [statusLoading, operationalSettings, users]);

  const columns: TableProps<OperationalSettingWithOrders>['columns'] = [
    {
      title: t('table.name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: t('table.createdDate'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value) => {
        const date = dayjs(value).format(defaultDateTimeFormat);
        return <Typography.Text>{date}</Typography.Text>;
      },
    },
    {
      title: t('table.process'),
      key: 'process',
      dataIndex: 'orders',
      className: 'process',
      render: (_, record) => {
        const percent = calculateGroupCompletionPercentage(record);
        return (
          <Progress
            strokeColor={percent === 100 ? token.green : token.colorPrimary}
            percent={percent}
            status="active"
          />
        );
      },
    },
    {
      title: t('table.price'),
      key: 'price',
      width: 150,
      render: (_, record) => {
        return <Typography.Text>{formatCurrencyToVnd(calculateTotalPrice(record.orders || []))}</Typography.Text>;
      },
    },
    {
      title: t('table.status'),
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (value, record) => {
        return (
          <Switch
            checkedChildren={t('', 'Opening')}
            unCheckedChildren={t('', 'Closed')}
            checked={value === 'opening'}
            loading={statusLoading?.status && statusLoading.id === record._id}
            onClick={(_, e: React.MouseEvent) => {
              e.stopPropagation();
            }}
            onChange={async (isOpen) =>
              await handleUpdateOrderStatus({ _id: record._id, status: isOpen ? 'opening' : 'closed' })
            }
          />
        );
      },
    },
  ];

  const dataSource: OperationalSettingWithOrders[] | undefined = useMemo(
    () =>
      Object.values(operationalSettings).map((operationalSetting) => {
        return {
          key: operationalSetting._id,
          _id: operationalSetting._id,
          name: operationalSetting.name,
          createdAt: operationalSetting.createdAt,
          status: operationalSetting.status,
          orders: groupOrders?.[operationalSetting._id] || [],
        };
      }),
    [operationalSettings, groupOrders],
  );

  const headerOrder = () => {
    return (
      <Space>
        <Typography.Title level={2}>{t('title')}</Typography.Title>
        <Button
          onClick={() => navigate(getExactPath(routePaths.createOrder))}
          type="dashed"
          icon={<InsertRowRightOutlined />}
        >
          {t('createOrderBtn')}
        </Button>
      </Space>
    );
  };

  const handleClickDetailOrder = (record: OperationalSettingWithOrders): void => {
    setDrawerData((prev) => ({ ...prev, ...record, isOpen: true }));
  };

  const closeDrawer = (): void => {
    setDrawerData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <StyledOperationalSetting $tableBodyHeight={TABLE_HEIGHT}>
      {headerOrder()}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          expandable={{
            expandedRowRender: (record) => (
              <>
                {(record.orders || []).map((item) => (
                  <OrderCard key={item._id} order={item} users={data.users} />
                ))}
              </>
            ),
            rowExpandable: (record) => record.orders?.length !== 0,
          }}
          onRow={(record) => {
            return {
              onClick: () => {
                handleClickDetailOrder(record);
              },
              className: 'pointer-cursor',
            };
          }}
          scroll={{ y: TABLE_HEIGHT }}
          pagination={{ pageSize: DEFAULT_PARAMS.PAGE_SIZE }}
        />
      </Spin>
      <Drawer data={drawerData as OperationalSettingData} dispatch={{ closeDrawer, handleUpdateOrderStatus }} />
    </StyledOperationalSetting>
  );
};

const calculateTotalPrice = (orders: Order[]): number => {
  let totalPrice = 0;
  orders.forEach((order) => {
    order.products.forEach((product) => {
      totalPrice += product.price;
    });
  });
  return totalPrice;
};

const calculateGroupCompletionPercentage = (group: OperationalSettingWithOrders): number => {
  const defaultTotalOrder = { total: 0, done: 0 };

  const totalOrders =
    group?.orders?.reduce((acc, { usersStatus }) => {
      const usersStatusDone = Object.values(usersStatus || {}).filter((status) => status === OrderStatus.DONE);
      acc.total += Object.values(usersStatus || {}).length;
      acc.done += usersStatusDone.length;
      return acc;
    }, defaultTotalOrder) || defaultTotalOrder;

  if (totalOrders.total === 0) totalOrders.total = 1;
  return Math.round((totalOrders.done / totalOrders.total) * 100);
};
