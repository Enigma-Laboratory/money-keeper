import { ArrowLeftOutlined } from '@ant-design/icons';
import { ForgotPasswordParams } from '@enigma-laboratory/shared';
import { Button, Form, Input, Space, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AlertModalPayload } from 'interfaces';
import { AuthService } from 'stores';
import { EVENT_NAME, EventAction } from 'utils';

import { StyledLink } from './ForgotPage.styles';

export const ForgotPage: React.FC = () => {
  const { t } = useTranslation('auth');

  const recoverPassword = async (params: ForgotPasswordParams) => {
    const { success } = await AuthService.instance.forgotPassword(params);
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
        label={t('forgot.email')}
        rules={[
          { required: true, message: t('forgot.validation.emailEmpty') },
          {
            type: 'email',
            message: t('forgot.validation.emailInvalidFormat'),
          },
        ]}
      >
        <Input size="large" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: 60 }}>
        <Button type="primary" size="large" htmlType="submit" block>
          {t('forgot.submitBtn')}
        </Button>
      </Form.Item>
      <div style={{ marginTop: 40, textAlign: 'center' }}>
        <StyledLink to="/login">
          <Space size={10}>
            <ArrowLeftOutlined style={{ fontSize: 12 }} />
            <Typography.Text style={{ fontSize: 16, color: 'inherit' }}>{t('forgot.back')}</Typography.Text>
          </Space>
        </StyledLink>
      </div>
    </Form>
  );
};
