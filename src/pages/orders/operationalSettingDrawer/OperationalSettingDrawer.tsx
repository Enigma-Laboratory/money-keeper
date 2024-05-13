import { Switch, Typography } from 'antd';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { OperationalSettingDrawerStyled } from './OperationalSettingDrawer.styles';
import { OperationalSettingProps } from './withOperationalSettingDrawerController';

export const OperationalSettingDrawer = (props: OperationalSettingProps) => {
  const { t } = useTranslation('order');
  const { data, dispatch } = props;
  const { isOpen, statusLoading } = data;
  const { handleUpdateOrderStatus } = dispatch;
  const date = dayjs(data.createdAt).format('DD/MM/YYYY hh:mm');

  const renderHeader = (): ReactNode => {
    return (
      <Switch
        checkedChildren={t('', 'Opening')}
        unCheckedChildren={t('', 'Closed')}
        checked={data.status === 'opening'}
        loading={statusLoading?.status}
        onChange={async (isOpen) =>
          await handleUpdateOrderStatus({ _id: data._id, status: isOpen ? 'opening' : 'closed' })
        }
      />
    );
  };
  return (
    <OperationalSettingDrawerStyled open={isOpen} onClose={dispatch.closeDrawer} extra={renderHeader()}>
      <Typography.Title level={2}>{data.name}</Typography.Title>
      <Typography.Title level={5}>{date}</Typography.Title>
    </OperationalSettingDrawerStyled>
  );
};
