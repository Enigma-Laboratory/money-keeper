import { notification } from 'antd';
import { useTranslation } from 'react-i18next';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

export class NotificationService {
  openNotification(type: NotificationType, message: string, description: string) {
    notification[type]({
      message: message,
      description: description,
    });
  }

  notify(type: NotificationType, message: string, description: string = '') {
    const { t } = useTranslation();
    this.openNotification(type, t(message, message), t(description, description));
  }

  public success(message: string, description?: string) {
    this.notify('success', message, description);
  }

  error(message: string, description?: string) {
    this.notify('error', message, description);
  }

  warning(message: string, description?: string) {
    this.notify('warning', message, description);
  }

  info(message: string, description?: string) {
    this.notify('info', message, description);
  }
}
