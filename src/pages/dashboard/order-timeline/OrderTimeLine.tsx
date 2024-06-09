import { Divider, List, Skeleton, Spin, Typography, theme } from 'antd';
import { BaseOrderStatus } from 'components/order-status';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import InfiniteScroll from 'react-infinite-scroll-component';
import { NavigateService } from 'services';
import { OrderTimeline } from 'stores';
import { StyledList } from './OrderTimelineTable.styles';

dayjs.extend(relativeTime);

type OrderTimelineProps = {
  data: OrderTimeline;
  loading: boolean;
  height: number;
  dispatch?: {
    fetchNextPage: () => Promise<void>;
  };
};

export const OrderTimelineTable = ({ data, dispatch, loading, height }: OrderTimelineProps) => {
  const { nextPage } = data;
  const { token } = theme.useToken();

  return (
    <div id="scrollableDiv" style={{ height, overflow: 'auto' }}>
      <InfiniteScroll
        dataLength={data.data.length}
        next={dispatch?.fetchNextPage || Promise.resolve}
        hasMore={nextPage}
        loader={<Spin spinning style={{ height: 56, display: 'flex', justifyContent: 'center', marginTop: 16 }} />}
        endMessage={<Divider plain>That&apos;s all, nothing more.</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          itemLayout="horizontal"
          dataSource={data.data}
          loading={loading}
          renderItem={(item) => {
            const firstProductStatus = Object.entries(item.usersStatus)[0][1];
            return (
              <StyledList.Item
                onClick={() => NavigateService.instance.navigate(`/orders/detail/${item._id}`)}
                actions={[
                  <Typography.Text style={{ color: token.colorTextDescription }} key={item._id}>
                    {dayjs(item.createdAt).fromNow()}
                  </Typography.Text>,
                ]}
              >
                <Skeleton
                  style={{ display: 'flex', width: '100%' }}
                  avatar={false}
                  title={false}
                  paragraph={{ rows: 1, width: '100%' }}
                  loading={loading}
                  active
                >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: 128 }}>
                      <BaseOrderStatus status={firstProductStatus} />
                    </div>
                    <Typography.Text strong>#{item.orderNumber}</Typography.Text>
                  </div>
                </Skeleton>
              </StyledList.Item>
            );
          }}
        />
      </InfiniteScroll>
    </div>
  );
};
