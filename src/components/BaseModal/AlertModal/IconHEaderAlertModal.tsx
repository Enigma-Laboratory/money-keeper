import { CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import { AlertModalType, AlertType } from 'interface';
import { ReactElement } from 'react';

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
