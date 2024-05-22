import { CheckCircleOutlined, CloseCircleOutlined, MoreOutlined } from '@ant-design/icons';
import { Dropdown, Menu } from 'antd';
import { IOrder } from 'interface';
import { useTranslation } from 'react-i18next';

type OrderActionProps = {
  record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = () => {
  const { t } = useTranslation();

  const moreMenu = () => (
    <Menu mode="vertical" onClick={({ domEvent }) => domEvent.stopPropagation()}>
      <Menu.Item
        key="accept"
        style={{
          fontSize: 15,
          display: 'flex',
          alignItems: 'center',
          fontWeight: 500,
        }}
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
        onClick={() => console.log('delete order')}
      >
        {t('buttons.reject', 'Reject')}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={moreMenu()} trigger={['click']}>
      <MoreOutlined
        role="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
