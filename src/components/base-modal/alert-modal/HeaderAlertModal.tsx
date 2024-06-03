import { Space } from 'antd';
import { AlertModalType } from 'interfaces';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { IconHeaderAlertModal } from './IconHEaderAlertModal';

export const HeaderAlertModal = (props: { title: string | undefined; type: AlertModalType }): ReactElement => {
  const { title, type } = props;

  const { t } = useTranslation('common');

  return (
    <Space>
      <IconHeaderAlertModal type={type} />
      {/* {t(`alertTitle.title.${title ?? type}`)} */}
    </Space>
  );
};
