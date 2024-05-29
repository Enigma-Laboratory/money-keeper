import { Avatar, Divider, Flex, Switch, Typography } from 'antd';
import dayjs from 'dayjs';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { formatCurrencyToVnd, generateColorFromAlphabet } from 'utils';
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
      <Typography.Text strong style={{ fontSize: 32, display: 'block' }}>
        {data.name}
      </Typography.Text>
      <Typography.Text style={{ fontSize: 20, display: 'block' }}>{date}</Typography.Text>
      <Flex vertical gap={20}>
        {Object.entries(data.priceByUser).map(([userId, price]) => {
          return (
            <>
              <Divider style={{ margin: 0 }} />
              <Flex gap={10}>
                <Avatar
                  key={userId}
                  size={'large'}
                  style={{ backgroundColor: generateColorFromAlphabet(data.users[userId].name.charAt(0)) }}
                >
                  {data.users[userId].name}
                </Avatar>
                <Flex vertical style={{ flex: 1 }}>
                  <Typography.Text strong>{data.users[userId].name}</Typography.Text>
                  <Typography.Text>{price > 0 ? 'nhận được' : 'trả'}</Typography.Text>
                </Flex>
                <Typography.Text style={{ fontSize: '20px' }} strong type={price > 0 ? 'success' : 'danger'}>
                  {formatCurrencyToVnd(Math.abs(price))}
                </Typography.Text>
              </Flex>
            </>
          );
        })}
      </Flex>
    </OperationalSettingDrawerStyled>
  );
};
