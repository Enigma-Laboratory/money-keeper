import { Button, Form, Input, Typography, theme } from 'antd';
import React, { useState } from 'react';

import { authProvider } from 'context/authProvider';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const handleOnSubmit = async (params: { email: string; password: string }): Promise<void> => {
    setIsLoading(true);
    const { success, redirectTo, error } = await authProvider.login(params);
    if (success && !!redirectTo) {
      navigate(redirectTo);
    }
    switch (error?.message) {
      case 'Invalid email.':
        form.setFields([{ name: 'email', errors: [t('login.validation.emailExist')] }]);
        break;
      case 'Wrong password.':
        form.setFields([{ name: 'password', errors: [t('login.validation.passwordIncorrect')] }]);
        break;
      default:
        break;
    }
    setIsLoading(false);
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={handleOnSubmit} requiredMark={false}>
        <Form.Item
          name="email"
          label={t('login.email')}
          rules={[
            { required: true, message: t('login.validation.emailEmpty') },
            { type: 'email', message: t('login.validation.emailInvalidFormat') },
          ]}
        >
          <Input size="large" placeholder={t('login.placeholder.email')} />
        </Form.Item>
        <Form.Item
          name="password"
          label={t('login.password')}
          rules={[{ required: true, message: t('login.validation.passwordEmpty') }]}
        >
          <Input type="password" placeholder={t('login.placeholder.password')} size="large" />
        </Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, marginTop: 60, zIndex: 0 }}>
          <Link style={{ color: token.colorPrimaryTextHover, fontSize: '12px', marginLeft: 'auto' }} to="/forgot">
            {t('login.forgotPassword')}
          </Link>
        </div>

        <Form.Item style={{ marginBottom: 0 }}>
          <Button type="primary" size="large" htmlType="submit" loading={isLoading} block>
            {t('login.btnSubmit')}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 12 }}>
          {t('login.noAccount')}
          <Link to="/register" style={{ fontWeight: 'bold', color: token.colorPrimaryTextHover }}>
            {t('login.signup')}
          </Link>
        </Typography.Text>
      </div>
    </>
  );
};
