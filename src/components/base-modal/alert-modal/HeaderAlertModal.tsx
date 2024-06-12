import { Space } from 'antd';
import { AlertModalType } from 'interfaces';
import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { IconHeaderAlertModal } from './IconHEaderAlertModal';

/**
 * Improving the modal, using HeaderAlertModal for modal afterwards
 */
export const HeaderAlertModal = (props: { title?: string; type: AlertModalType }): ReactElement => {
  const { type } = props;

  const { t } = useTranslation('common');

  return (
    <Space>
      <IconHeaderAlertModal type={type} />
      hello
      {t(`alert.title.${type}`)}
    </Space>
  );
};
