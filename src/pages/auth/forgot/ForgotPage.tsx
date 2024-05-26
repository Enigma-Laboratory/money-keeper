import { Button, Form, Input } from 'antd';
import { authProvider } from 'context';
import { AlertModalPayload } from 'interface';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EVENT_NAME, EventAction } from 'utils';

export const ForgotPage: React.FC = () => {
  const { t } = useTranslation('auth');

  const recoverPassword = async (params: { email: string }) => {
    const { success } = await authProvider.forgotPassword({ email: params.email });
    console.log(success, 'success');
    if (success) {
      EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
        data: {
          type: 'info',
          content:
            'We sent instructions to change your password to @gmail.com, please check both your inbox and spam folder.',
        },
      });
    } else {
      EventAction.dispatch<AlertModalPayload>(EVENT_NAME.OPEN_MODAL, {
        data: {
          type: 'error',
          content: t('forgot.message.failure'),
        },
      });
    }
  };

  return (
    <Form layout="vertical" onFinish={recoverPassword} requiredMark={false}>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: t('forgot.validation.emailEmpty') },
          {
            type: 'email',
            message: t('forgot.validation.emailInvalidFormat'),
          },
        ]}
      >
        <Input size="large" placeholder={t('forgot.placeholder.email')} />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 60 }}>
        <Button type="primary" size="large" htmlType="submit" block>
          {t('forgot.submitBtn')}
        </Button>
      </Form.Item>
    </Form>
  );
};
