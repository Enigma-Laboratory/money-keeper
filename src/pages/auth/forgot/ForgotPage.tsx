import { Button, Form, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ForgotPage: React.FC = () => {
  const { t } = useTranslation('auth');

  return (
    <Form layout="vertical" onFinish={() => {}} requiredMark={false}>
      <Form.Item
        name="email"
        label={'Email'}
        rules={[
          { required: true },
          {
            type: 'email',
            message: t('register.errors.validEmail', 'Invalid email address'),
          },
        ]}
      >
        <Input size="large" placeholder={t('register.email', 'Email')} />
      </Form.Item>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      ></div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" size="large" htmlType="submit" block>
          {t('forgot.submitBtn')}
        </Button>
      </Form.Item>
    </Form>
  );
};
