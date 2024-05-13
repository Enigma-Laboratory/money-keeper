import { InsertRowRightOutlined } from '@ant-design/icons';
import { OperationalSetting, Order } from '@enigma-laboratory/shared';
import { Button, Space, Spin, Switch, Table, Typography } from 'antd';
import type { TableProps } from 'antd/es/table';
import { BaseOrderStatus } from 'components/OrderStatus';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { routePaths } from 'routes/routeComponent';
import { getExactPath } from 'utils';
import { THC } from 'utils/constants';
import { StyledOrder } from './Order.styles';
import { OperationalSettingDrawer } from './operationalSettingDrawer/OperationalSettingDrawer';
import { IOperationalSettingData } from './operationalSettingDrawer/withOperationalSettingDrawerController';
import { IOperationalSettingProps } from './withOrderController';
export interface OperationalSettingWithOrders extends OperationalSetting {
  orders?: Order[];
}

export const Orders = (props: IOperationalSettingProps): ReactElement => {
  const { data, dispatch } = props;
  const { isLoading, statusLoading, groupOrders, operationalSettings } = data;
  const { handleUpdateOrderStatus } = dispatch;
  const navigate = useNavigate();
  const { t } = useTranslation('order');

  const [drawerData, setDrawerData] = useState<Partial<IOperationalSettingData>>({ isOpen: false, statusLoading });

  useEffect(() => {
    setDrawerData((prevDrawerData) => {
      const updatedStatus = operationalSettings?.[prevDrawerData?._id || '']?.status;
      return { ...prevDrawerData, statusLoading, status: !!updatedStatus ? updatedStatus : prevDrawerData.status };
    });
  }, [statusLoading, operationalSettings]);

  const TABLE_HEIGHT = useMemo(
    () =>
      window.innerHeight -
      THC.HEADER_HEIGHT -
      THC.PADDING_MAIN_LAYOUT_HEIGHT * 2 -
      THC.ORDER_PAGE.HEADER_HEIGHT -
      THC.ORDER_PAGE.HEADER_MARGIN -
      THC.ORDER_PAGE.PAGINATION_HEIGHT -
      THC.ORDER_PAGE.PAGINATION_MARGIN * 2 -
      THC.ORDER_PAGE.HEADER_TABLE,
    [],
  );

  const columns: TableProps<OperationalSettingWithOrders>['columns'] = [
    {
      title: t('', 'Name'),
      dataIndex: 'name',
      key: 'name',
      render: (value) => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: t('', 'Created Date'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value) => {
        const date = dayjs(value).format('DD/MM/YYYY hh:mm');
        return (
          <>
            <Typography.Text>{date}</Typography.Text>
          </>
        );
      },
    },
    {
      title: t('', 'Orders'),
      key: 'orders',
      dataIndex: 'orders',
      render: (order: Order[]) => {
        return (
          <div>
            {(order || []).map((item) => (
              <Space key={item._id}>
                <Link to={getExactPath(routePaths.detailOrder, { id: item._id })}> {item.name}</Link>
                <BaseOrderStatus style={{ width: 100 }} status={item.status} />
              </Space>
            ))}
          </div>
        );
      },
    },
    {
      title: t('', 'Status'),
      dataIndex: 'status',
      key: 'status',
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
        <Typography.Title level={2}>{t('order.title', 'Order')}</Typography.Title>
        <Button onClick={() => navigate(routePaths.createOrder)} type="dashed" icon={<InsertRowRightOutlined />}>
          {t('orders.createOrder', 'Create order')}
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
    <StyledOrder $tableBodyHeight={TABLE_HEIGHT}>
      {headerOrder()}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          // onChange={onChange}
          onRow={(record) => {
            return {
              onClick: () => {
                handleClickDetailOrder(record);
              },
              className: 'pointer-cursor',
            };
          }}
          scroll={{ y: TABLE_HEIGHT }}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
      <OperationalSettingDrawer
        data={drawerData as IOperationalSettingData}
        dispatch={{ closeDrawer, handleUpdateOrderStatus }}
      />
    </StyledOrder>
  );
};
