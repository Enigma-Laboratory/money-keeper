import { ClockCircleOutlined, DollarCircleOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Flex, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';

import { TrendDownIcon, TrendUpIcon } from 'assets/icons';
import { CardWithContent, CardWithPlot, DropdownDateFilter } from 'components';

import { DashboardStyled } from './Dashboard.styles';
import { DailyRevenueChart } from './dail-revenue';
import { DailyCustomerChart } from './daily-customers';
import { DailyOrderChart } from './daily-orders';
import { OrderTimelineChart } from './order-timeline';
import { RecentOrderChart } from './recent-orders';
import { DashboardProps } from './withDashboardController';

export const DashboardPage = (props: DashboardProps) => {
  const { data, dispatch, loading } = props;
  const { dailyOrder, dailyRevenue, dailyCustomer, recentOrder, orderTimeline } = data;

  const { token } = theme.useToken();
  const { t } = useTranslation();

  // const orders = useMemo(() => {
  //   const data = dailyOrdersData?.data?.data;
  //   if (!data) return { data: [], trend: 0 };

  //   const plotData = data.map((order) => {
  //     const date = dayjs(order.date);
  //     return {
  //       timeUnix: date.unix(),
  //       timeText: date.format('DD MMM YYYY'),
  //       value: order.value,
  //       state: 'Daily Orders',
  //     };
  //   });

  //   return {
  //     data: plotData,
  //     trend: dailyOrdersData?.data?.trend || 0,
  //   };
  // }, [dailyOrdersData]);

  // const newCustomers = useMemo(() => {
  //   const data = newCustomersData?.data?.data;
  //   if (!data) return { data: [], trend: 0 };

  //   const plotData = data.map((customer) => {
  //     const date = dayjs(customer.date);
  //     return {
  //       timeUnix: date.unix(),
  //       timeText: date.format('DD MMM YYYY'),
  //       value: customer.value,
  //       state: 'New Customers',
  //     };
  //   });

  //   return {
  //     data: plotData,
  //     trend: newCustomersData?.data?.trend || 0,
  //   };
  // }, [newCustomersData]);

  return (
    <DashboardStyled>
      <div className="header">
        <h3>{t('dashboard.overview', 'Overview')}</h3>
        <DropdownDateFilter
          onChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={<DollarCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                title={t('dashboard.dailyRevenue.title')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>
                      {/* {revenue.trend.toLocaleString('us', { style: 'currency', currency: 'USD' })} */}
                    </Typography.Text>
                    {dailyRevenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyRevenueChart height={170} data={dailyRevenue.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={<ShoppingOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{dailyOrder.trend}</Typography.Text>
                    {dailyOrder.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
                title={t('dashboard.dailyOrders.title')}
              >
                <DailyOrderChart height={170} data={dailyOrder.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={<UserOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                title={t('dashboard.newCustomers.title')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{`${dailyCustomer.trend / 100}%`}</Typography.Text>
                    {dailyCustomer.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyCustomerChart height={170} data={dailyCustomer.data} />
              </CardWithPlot>
            </Col>
          </Row>
        </Col>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{ height: 432, overflow: 'hidden', padding: 0 }}
            icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
            title={t('dashboard.recentOrders.title')}
          >
            <RecentOrderChart
              data={recentOrder}
              loading={loading?.recentOrder || false}
              dispatch={{
                fetchRecentOrder: dispatch?.fetchRecentOrder || (() => new Promise((resolve) => resolve())),
              }}
            />
          </CardWithContent>
        </Col>
        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{ height: 430, overflow: 'hidden', padding: 0 }}
            icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
            title={t('dashboard.timeline.title')}
          >
            <OrderTimelineChart
              data={orderTimeline}
              loading={loading?.orderTimeline || false}
              dispatch={{
                fetchNextPage: dispatch?.fetchOrderTimelineNext || (() => new Promise((resolve) => resolve())),
              }}
            />
          </CardWithContent>
        </Col>
      </Row>
    </DashboardStyled>
  );
};
