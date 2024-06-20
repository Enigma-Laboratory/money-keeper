import { notification } from 'antd';
import { ReactElement, ReactNode } from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationProps {
  type: NotificationType;
  message: ReactNode;
  description: ReactNode;
}

export const Notification = (props: NotificationProps): ReactElement => {
  const { type, message, description } = props;
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api[type]({
      message,
      description,
    });
  };

  return (
    <>
      {contextHolder}
      {openNotificationWithIcon}
    </>
  );
};
