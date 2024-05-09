import { InsertRowRightOutlined } from '@ant-design/icons';
import { OperationalSetting, Order } from '@enigma-laboratory/shared';
import { Space, Spin, Switch, Table, Typography } from 'antd';
import type { TableProps } from 'antd/es/table';
import { BaseButton } from 'components';
import { BaseOrderStatus } from 'components/OrderStatus';
import dayjs from 'dayjs';
import { ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'routes/routeComponent';
import { THC } from 'utils/constants';
import { getExactPath } from 'utils/getExactPath';
import { OrderStyled } from './Order.styles';
import { OrderProps } from './withOrderController';
interface DataType extends OperationalSetting {
  key: string;
  name: string;
  createdAt: Date;
  orders?: Order[];
}

export const Orders = (props: OrderProps): ReactElement => {
  const { data, dispatch } = props;
  const { isLoading, isStatusLoading, groupOrders, operationalSettings } = data;
  const navigate = useNavigate();
  const { t } = useTranslation('order');

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

  const columns: TableProps<DataType>['columns'] = [
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
              <Space>
                {item.name}
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
            loading={isStatusLoading?.status && isStatusLoading.id === record._id}
            onChange={async (isOpen) =>
              await dispatch?.handleOnChangeOrderStatus({ _id: record._id, status: isOpen ? 'opening' : 'closed' })
            }
          />
        );
      },
    },
  ];
  const dataSource: DataType[] | undefined = useMemo(
    () =>
      Object.values(operationalSettings).map((operationalSetting) => {
        return {
          _id: operationalSetting._id,
          key: operationalSetting._id,
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
        <BaseButton onClick={() => navigate(routePaths.createOrder)} type="dashed" icon={<InsertRowRightOutlined />}>
          {t('orders.createOrder', 'Create order')}
        </BaseButton>
      </Space>
    );
  };
  const handleClickDetailOrder = (record: any) => {
    navigate(getExactPath(routePaths.detailOrder, { id: record?.key }));
  };

  return (
    <OrderStyled $tableBodyHeight={TABLE_HEIGHT}>
      {headerOrder()}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          // onChange={onChange}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {
          //       handleClickDetailOrder(record);
          //     },
          //     className: 'pointer-cursor',
          //   };
          // }}
          scroll={{ y: TABLE_HEIGHT }}
          pagination={{ pageSize: 10 }}
        />
      </Spin>
    </OrderStyled>
  );
};
