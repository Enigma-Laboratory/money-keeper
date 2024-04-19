import React, { useState } from 'react';

import { Row, Col, Layout, Card, Typography, Form, Input, Button, theme } from 'antd';

import { layoutStyles, containerStyles, titleStyles, headStyles, bodyStyles } from './LoginPage.styles';

import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { authProvider } from 'context/authProvider';

export const LoginPage: React.FC<{ setIsLoggedIn: (value: boolean) => void }> = ({ setIsLoggedIn }) => {
  const { token } = theme.useToken();
  const { t } = useTranslation();

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
      {t('auth.login.title')}
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
          label={t('auth.login.email')}
          rules={[
            { required: true },
            {
              type: 'email',
              message: t('auth.login.errors.validEmail'),
            },
          ]}
        >
          <Input size="large" placeholder={t('auth.login.email')} />
        </Form.Item>
        <Form.Item name="password" label={t('auth.login.password')} rules={[{ required: true }]}>
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
            {t('auth.login.forgotPassword')}
          </Link>
        </div>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" loading={isLoading} block>
            {t('auth.login.btnSubmit', 'Sign in')}
          </Button>
        </Form.Item>
      </Form>
      <div style={{ marginTop: 20 }}>
        <Typography.Text style={{ fontSize: 12 }}>
          {t('auth.login.noAccount')}
          <Link
            to="/register"
            style={{
              fontWeight: 'bold',
              color: token.colorPrimaryTextHover,
            }}
          >
            {t('auth.login.signup')}
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
