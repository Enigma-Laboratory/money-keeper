import { Space } from 'antd';
import { ReactElement } from 'react';
import { IconHeaderAlertModal } from './IconHEaderAlertModal';
import { AlertModalType } from './AlertModal';
import { useTranslation } from 'react-i18next';

export const HeaderAlertModal = (props: { title: string | undefined; type: AlertModalType }): ReactElement => {
  const { title, type } = props;

  const { t } = useTranslation('common');

  return (
    <Space>
      <IconHeaderAlertModal type={type} />
      {t(`alertTitle.${title ?? type}`)}
    </Space>
  );
};
