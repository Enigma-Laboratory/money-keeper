import { MoreOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { IOrder } from 'interfaces';

type OrderActionProps = {
  record: IOrder;
};

export const OrderActions: React.FC<OrderActionProps> = () => {
  // const moreMenu = () => (
  //   <Menu mode="vertical" onClick={({ domEvent }) => domEvent.stopPropagation()}>
  //     <Menu.Item
  //       key="accept"
  //       style={{
  //         fontSize: 15,
  //         display: 'flex',
  //         alignItems: 'center',
  //         fontWeight: 500,
  //       }}
  //       icon={<CheckCircleOutlined style={{ color: '#52c41a', fontSize: 17, fontWeight: 500 }} />}
  //       onClick={() => {}}
  //     >
  //       {t('buttons.accept', 'Accept')}
  //     </Menu.Item>
  //     <Menu.Item
  //       key="reject"
  //       style={{
  //         fontSize: 15,
  //         display: 'flex',
  //         alignItems: 'center',
  //         fontWeight: 500,
  //       }}
  //       icon={<CloseCircleOutlined style={{ color: '#EE2A1E', fontSize: 17 }} />}
  //     >
  //       {t('buttons.reject', 'Reject')}
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <Dropdown trigger={['click']}>
      <MoreOutlined
        role="button"
        onClick={(e) => {
          e.stopPropagation();
        }}
      />
    </Dropdown>
  );
};
