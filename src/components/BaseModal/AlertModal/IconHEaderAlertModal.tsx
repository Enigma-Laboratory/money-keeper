import { CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { ReactElement } from 'react';
import { AlertModalType } from './AlertModal';
import { AlertType } from 'interface';

export const IconHeaderAlertModal = (props: { type: AlertModalType }): ReactElement => {
  const { type } = props;
  switch (type) {
    case AlertType.CONFIRM:
    case AlertType.WARNING:
      return <InfoCircleFilled style={{ color: 'orange' }} />;
    case AlertType.INFO:
      return <InfoCircleFilled style={{ color: 'blue' }} />;
    case AlertType.ERROR:
      return <CloseCircleFilled style={{ color: 'red' }} />;
    default:
      return <></>;
  }
};
