import { ClockCircleOutlined, DollarCircleOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Flex, Row, Typography, theme } from 'antd';
import { useTranslation } from 'react-i18next';

import { TrendDownIcon, TrendUpIcon } from 'assets/icons';
import { CardWithContent, CardWithPlot, DateFilterSelect } from 'components';
import { formatCurrencyToVnd } from 'utils';

import { DashboardStyled } from './Dashboard.styles';
import { DailyRevenueChart } from './dail-revenue';
import { DailyCustomerChart } from './daily-customers';
import { DailyOrderChart } from './daily-orders';
import { OrderTimelineTable } from './order-timeline';
import { RecentOrderTable } from './recent-orders';
import { DashboardProps, loadingInit } from './withDashboardController';

export const DashboardPage = (props: DashboardProps) => {
  const { data, dispatch, loading = loadingInit } = props;
  const { dailyOrder, dailyRevenue, dailyCustomer, recentOrder, orderTimeline, filter } = data;

  const { token } = theme.useToken();
  const { t } = useTranslation('dashboard');

  return (
    <DashboardStyled>
      <div className="header">
        <h3>{t('', 'Overview')}</h3>
        <DateFilterSelect onChange={dispatch?.fetchDaily} />
      </div>
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                loading={loading.dailyRevenue}
                icon={<DollarCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                title={t('', 'Daily Revenue')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{formatCurrencyToVnd(dailyRevenue.trend)}</Typography.Text>
                    {dailyRevenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyRevenueChart height={170} data={dailyRevenue.data} filter={filter} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                loading={loading.dailyOrder}
                icon={<ShoppingOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{dailyOrder.trend}</Typography.Text>
                    {dailyOrder.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
                title={t('', 'Daily Order')}
              >
                <DailyOrderChart height={170} data={dailyOrder.data} filter={filter} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                loading={loading.dailyCustomer}
                icon={<UserOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
                title={t('', 'New Customer')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{`${dailyCustomer.trend / 100}%`}</Typography.Text>
                    {dailyCustomer.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyCustomerChart height={170} data={dailyCustomer.data} filter={filter} />
              </CardWithPlot>
            </Col>
          </Row>
        </Col>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{ height: 432, overflow: 'hidden', padding: 0 }}
            icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
            title={t('', 'Recent Order')}
          >
            <RecentOrderTable
              data={recentOrder}
              loading={loading.recentOrder}
              dispatch={{
                fetchRecentOrder: dispatch?.fetchRecentOrder || Promise.resolve,
              }}
            />
          </CardWithContent>
        </Col>
        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{ height: 430, overflow: 'hidden', padding: 0 }}
            icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
            title={t('', 'Order Timeline')}
          >
            <OrderTimelineTable
              data={orderTimeline}
              loading={loading.orderTimeline}
              dispatch={{
                fetchNextPage: dispatch?.fetchOrderTimelineNext || Promise.resolve,
              }}
            />
          </CardWithContent>
        </Col>
      </Row>
    </DashboardStyled>
  );
};
