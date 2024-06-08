import { Card, Flex, Spin, Typography } from 'antd';
import { PropsWithChildren, ReactNode } from 'react';

export const CardWithPlot = (
  props: PropsWithChildren<{
    icon: ReactNode;
    title: string;
    rightSlot?: ReactNode;
    bodyStyles?: React.CSSProperties;
    loading: boolean;
  }>,
) => {
  return (
    <Spin spinning={props.loading}>
      <Card
        styles={{
          header: { padding: '16px 16px 10px 16px', minHeight: 'max-content', borderBottom: 0 },
          body: { padding: '24px 16px 24px 24px', ...(props?.bodyStyles || {}) },
        }}
        title={
          <Flex align="center" justify="space-between">
            <Flex gap={8}>
              {props.icon}
              <Typography.Text style={{ fontWeight: 400 }}>{props.title}</Typography.Text>
            </Flex>
            {props?.rightSlot}
          </Flex>
        }
      >
        {props.children}
      </Card>
    </Spin>
  );
};
