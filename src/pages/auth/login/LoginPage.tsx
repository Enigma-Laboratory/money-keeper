import React, { useState } from 'react';

import { Alert, Button, Card, Col, Form, Input, Layout, Row, Typography, theme } from 'antd';

import { bodyStyles, containerStyles, headStyles, layoutStyles, titleStyles } from './LoginPage.styles';

import { authProvider } from 'context/authProvider';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const LoginPage: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);

  const navigate = useNavigate();

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {t('login.title')}
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
      setIsError(true);
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
      {isError && <Alert message={t('login.error.valid', 'Email or password not correct')} type="error" showIcon />}
      <Form layout="vertical" onFinish={handleOnSubmit} requiredMark={false}>
        <Form.Item
          name="email"
          label={t('login.email')}
          rules={[
            { required: true },
            {
              type: 'email',
              message: t('login.errors.validEmail'),
            },
          ]}
        >
          <Input size="large" placeholder={t('login.email')} />
        </Form.Item>
        <Form.Item name="password" label={t('login.password')} rules={[{ required: true }]}>
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
            {t('login.forgotPassword')}
          </Link>
        </div>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" loading={isLoading} block>
            {t('login.btnSubmit')}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 12 }}>
          {t('login.noAccount')}
          <Link
            to="/register"
            style={{
              fontWeight: 'bold',
              color: token.colorPrimaryTextHover,
            }}
          >
            {t('login.signup')}
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
