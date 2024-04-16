import React, { useState } from 'react';

import { Row, Col, Layout, Card, Typography, Form, Input, Button, theme } from 'antd';

import { layoutStyles, containerStyles, titleStyles, headStyles, bodyStyles } from './LoginPage.styles';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { authProvider } from 'context/authProvider';

export const LoginPage: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {t('register.title', 'Sign in to your account')}
    </Typography.Title>
  );

  const handleOnSubmit = async (params: { email: string; password: string }): Promise<void> => {
    setIsLoading(true);
    try {
      const { success, redirectTo } = await authProvider.login(params);
      if (success && !!redirectTo) {
        setIsLoggedIn(true);
        navigate(redirectTo);
      }
    } catch (error) {
      console.log('Can not login :', error);
    } finally {
      setIsLoading(false);
    }
  };

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
    >
      <Form layout="vertical" onFinish={handleOnSubmit} requiredMark={false}>
        <Form.Item
          name="email"
          label={t('register.email', 'Email')}
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
        <Form.Item name="password" label={t('register.password', 'Password')} rules={[{ required: true }]}>
          <Input type="password" placeholder="●●●●●●●●" size="large" />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '24px',
          }}
        >
          <Link
            style={{
              color: token.colorPrimaryTextHover,
              fontSize: '12px',
              marginLeft: 'auto',
            }}
            to="/forgot-password"
          >
            {t('pages.login.buttons.forgotPassword', 'Forgot password?')}
          </Link>
        </div>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" loading={isLoading} block>
            {t('pages.register.btnSubmit', 'Sign in')}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 12 }}>
          {t('pages.login.buttons.noAccount', 'Don’t have an account?')}{' '}
          <Link
            to="/register"
            style={{
              fontWeight: 'bold',
              color: token.colorPrimaryTextHover,
            }}
          >
            {t('pages.login.signup', 'Sign up')}
          </Link>
        </Typography.Text>
      </div>
    </Card>
  );

  return (
    <Layout style={layoutStyles}>
      <Row
        justify="center"
        align={'middle'}
        style={{
          padding: '16px 0',
          minHeight: '100dvh',
          paddingTop: '16px',
        }}
      >
        <Col xs={22}>{CardContent}</Col>
      </Row>
    </Layout>
  );
};
