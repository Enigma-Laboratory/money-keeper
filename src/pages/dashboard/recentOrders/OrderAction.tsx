import { CheckCircleOutlined, CloseCircleOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { IOrder } from 'interface';
import { useTranslation } from 'react-i18next';

type OrderActionProps = {
  record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = ({ record }) => {
  const { t } = useTranslation();

  const moreMenu = (record: IOrder) => (
    <Menu mode="vertical" onClick={({ domEvent }) => domEvent.stopPropagation()}>
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
        }}
        disabled={record.status.text !== 'Pending'}
        icon={
          <CheckCircleOutlined
            style={{
              color: '#52c41a',
              fontSize: 17,
              fontWeight: 500,
            }}
          />
        }
        onClick={() => {
          console.log('update order');
        }}
      >
        {t('buttons.accept', 'Accept')}
      </Menu.Item>
      <Menu.Item
        key="reject"
        style={{
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
        }}
        icon={
          <CloseCircleOutlined
            style={{
              color: '#EE2A1E',
              fontSize: 17,
            }}
          />
        }
        disabled={record.status.text === 'Delivered' || record.status.text === 'Cancelled'}
        onClick={() => console.log('delete order')}
      >
        {t('buttons.reject', 'Reject')}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={moreMenu(record)} trigger={['click']}>
      <MoreOutlined
        role="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
