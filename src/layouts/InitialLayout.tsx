import { Card, Col, Layout, Row, Typography, theme } from 'antd';
import { ReactNode } from 'react';

import { bodyStyles, containerStyles, headStyles, layoutStyles, titleStyles } from './InitialLayout.styles';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

interface InitialLayoutProps {
  children: ReactNode;
}

export const InitialLayout = ({ children }: InitialLayoutProps) => {
  const { token } = theme.useToken();
  const { t } = useTranslation('auth');
  const { pathname } = useLocation();

  const CardTitle = (
    <Typography.Title
      level={3}
      style={{
        color: token.colorPrimaryTextHover,
        ...titleStyles,
      }}
    >
      {t(`${pathname.substring(1)}.title`)}
    </Typography.Title>
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
        <Col xs={22}>
          <Card
            title={CardTitle}
            headStyle={headStyles}
            bodyStyle={bodyStyles}
            style={{
              ...containerStyles,
              backgroundColor: token.colorBgElevated,
            }}
          >
            {children}
          </Card>
        </Col>
      </Row>
    </Layout>
  );
};
