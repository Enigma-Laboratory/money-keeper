import { Divider, List, Skeleton, Spin, Typography, theme } from 'antd';
import { BaseOrderStatus } from 'components/OrderStatus';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IOrder } from 'interface';
import InfiniteScroll from 'react-infinite-scroll-component';

dayjs.extend(relativeTime);

type OrderTimelineProps = {
  data: {
    orders?: IOrder[];
    height?: string;
    hasNextPage?: boolean;
    isLoading?: boolean;
  };
  dispatch: {
    fetchNextPage: () => void;
  };
};

export const OrderTimeline = ({ data, dispatch }: OrderTimelineProps) => {
  const { height = '432px', hasNextPage, isLoading, orders = [] } = data;
  const { fetchNextPage } = dispatch;
  const { token } = theme.useToken();

  return (
    <div
      id="scrollableDiv"
      style={{
        display: 'block',
        height: height,
        overflow: 'auto',
      }}
    >
      <InfiniteScroll
        dataLength={orders.length}
        next={() => fetchNextPage()}
        hasMore={hasNextPage || false}
        loader={
          <Spin
            spinning
            style={{
              height: '56px',
              display: 'flex',
              justifyContent: 'center',
              marginTop: '16px',
            }}
          />
        }
        endMessage={<Divider plain>That&apos;s all, nothing more.</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item
                onClick={() => console.log('Navigate to order.')}
                style={{
                  cursor: 'pointer',
                  height: '54px',
                  padding: '16px',
                }}
                actions={[
                  <Typography.Text
                    style={{
                      color: token.colorTextDescription,
                    }}
                    key={'createdAt'}
                  >
                    {dayjs(item.createdAt).fromNow()}
                  </Typography.Text>,
                ]}
              >
                <Skeleton
                  style={{ display: 'flex', width: '100%' }}
                  avatar={false}
                  title={false}
                  paragraph={{ rows: 1, width: '100%' }}
                  loading={isLoading}
                  active
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <div style={{ width: '128px' }}>
                      <BaseOrderStatus status={item.status.text as any} />
                    </div>
                    <Typography.Text strong>#{item.orderNumber}</Typography.Text>
                  </div>
                </Skeleton>
              </List.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
