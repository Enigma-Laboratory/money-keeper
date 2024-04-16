import React from 'react';

import { Row, Col, Layout, Card, Typography, Form, Input, Button, theme } from 'antd';

import { layoutStyles, containerStyles, titleStyles, headStyles, bodyStyles } from './Register.styles';

import { useTranslation } from 'react-i18next';

export const RegisterPage: React.FC<any> = ({ providers, loginLink, wrapperProps, contentProps, formProps }) => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {t('register.title', 'Sign up for your account.')}
    </Typography.Title>
  );

  const CardContent = (
    <Card
      title={CardTitle}
      headStyle={headStyles}
      bodyStyle={bodyStyles}
      style={{
        ...containerStyles,
        backgroundColor: token.colorBgElevated,
      }}
      {...(contentProps ?? {})}
    >
      <Form layout="vertical" onFinish={(values) => {}} requiredMark={false} {...formProps}>
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
        ></div>
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Button type="primary" size="large" htmlType="submit" block>
            {t('pages.register.btnSubmit', 'Register')}
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );

  return (
    <Layout style={layoutStyles} {...(wrapperProps ?? {})}>
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
