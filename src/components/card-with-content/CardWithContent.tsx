import { Card, Space, Typography } from 'antd';
import { useConfigProvider } from 'contexts';
import { PropsWithChildren, ReactNode } from 'react';

export const CardWithContent = (
  props: PropsWithChildren<{
    icon?: ReactNode;
    title: string;
    bodyStyles?: React.CSSProperties;
  }>,
) => {
  const { mode } = useConfigProvider();

  return (
    <Card
      styles={{
        header: {
          backgroundColor: mode === 'light' ? '#FAFAFA' : '#1F1F1F',
          padding: '16px',
        },
        body: { ...(props?.bodyStyles || {}) },
      }}
      title={
        <Space align="center" size={8}>
          {props.icon}
          <Typography.Text style={{ fontWeight: 400, lineHeight: '26px' }}>{props.title}</Typography.Text>
        </Space>
      }
    >
      {props.children}
    </Card>
  );
};
