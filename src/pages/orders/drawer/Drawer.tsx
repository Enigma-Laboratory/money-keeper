import { Switch, Typography } from 'antd';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { DrawersStyled } from './Drawer.styles';
import { DrawerProps } from './withDrawerController';

export const Drawer = (props: DrawerProps) => {
  const { t } = useTranslation('order');
  const { data, dispatch } = props;
  const { isOpen, statusLoading } = data;
  const { handleOnChangeOrderStatus } = dispatch;
  const date = dayjs(data.createdAt).format('DD/MM/YYYY hh:mm');

  const renderHeader = (): ReactNode => {
    return (
      <Switch
        checkedChildren={t('', 'Opening')}
        unCheckedChildren={t('', 'Closed')}
        checked={data.status === 'opening'}
        loading={statusLoading?.status}
        onChange={async (isOpen) =>
          await handleOnChangeOrderStatus({ _id: data._id, status: isOpen ? 'opening' : 'closed' })
        }
      />
    );
  };
  return (
    <DrawersStyled open={isOpen} onClose={dispatch.closeDrawer} extra={renderHeader()}>
      <Typography.Title level={2}>{data.name}</Typography.Title>
      <Typography.Title level={5}>{date}</Typography.Title>
    </DrawersStyled>
  );
};
