import { Card, Flex, Spin, Typography } from 'antd';
import { DownTrendIcon, UnchangedIcon, UpTrendIcon } from 'assets/icons';
import { PropsWithChildren, ReactNode } from 'react';
interface CardWithPlotProps extends PropsWithChildren {
  icon: ReactNode;
  title: string;
  bodyStyles?: React.CSSProperties;
  loading: boolean;
  trend: number;
}
const renderTrendIcon = (trend: number) => {
  if (trend > 0) return <UpTrendIcon />;
  else if (trend < 0) return <DownTrendIcon />;
  else return <UnchangedIcon />;
};

export const CardWithPlot = (props: CardWithPlotProps) => {
  const { loading, bodyStyles, trend, icon } = props;
  return (
    <Spin spinning={loading}>
      <Card
        styles={{
          header: { padding: 10, minHeight: 'max-content', borderBottom: 0 },
          body: { padding: 10, ...(bodyStyles || {}) },
        }}
        title={
          <Flex gap={8}>
            {icon}
            <Typography.Text style={{ fontWeight: 400 }}>{props.title}</Typography.Text>
          </Flex>
        }
        extra={
          <Flex gap={8}>
            <Typography.Text>{`${trend / 100}%`}</Typography.Text>
            {renderTrendIcon(trend)}
          </Flex>
        }
      >
        {props.children}
      </Card>
    </Spin>
  );
};
