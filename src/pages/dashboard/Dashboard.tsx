import { ClockCircleOutlined, DollarCircleOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import { Col, Row, Typography, theme } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardStyled } from './Dashboard.styles';
import { DashboardProps } from './withDashboardController';

import { CardWithContent, CardWithPlot, DateFilterSelect } from 'components';
import { THC } from 'utils';

import { DailyRevenueChart } from './dail-revenue';
import { DailyCustomerChart } from './daily-customers';
import { DailyOrderChart } from './daily-orders';
import { OrderTimelineTable } from './order-timeline';
import { RecentOrderTable } from './recent-orders';
import { loadingInit } from './withDashboardController';

export const CHART_HEIGHT = 150;
const MIN_TABLE_HEIGHT = 400;

export const DashboardPage = (props: DashboardProps) => {
  const { data, dispatch, loading = loadingInit } = props;
  const { dailyOrder, dailyRevenue, dailyCustomer, recentOrder, orderTimeline, filter } = data;
  const { token } = theme.useToken();
  const { t } = useTranslation('dashboard');

  const TABLE_HEIGHT = useMemo(
    () =>
      window.innerHeight -
      THC.HEADER_HEIGHT -
      THC.PADDING_MAIN_LAYOUT_HEIGHT * 2 -
      THC.DASHBOARD_PAGE.HEADER_HEIGHT -
      THC.DASHBOARD_PAGE.CHART_CARD -
      THC.DASHBOARD_PAGE.TABLE_CHART_SPACE -
      THC.DASHBOARD_PAGE.HEADER_CARD_HEIGHT -
      THC.DASHBOARD_PAGE.HEADER_CARD_BORDER,
    [],
  );

  const RECENT_ORDER_TABLE_HEIGHT = useMemo(
    () =>
      TABLE_HEIGHT -
      THC.DASHBOARD_PAGE.TABLE.PAGINATION_HEIGHT -
      THC.DASHBOARD_PAGE.TABLE.PAGINATION_MARGIN -
      THC.DASHBOARD_PAGE.TABLE.HEADER_HEIGHT -
      THC.DASHBOARD_PAGE.TABLE.BOTTOM_PADDING,
    [],
  );

  const renderDailyRevenueCard = useMemo(() => {
    return (
      <CardWithPlot
        loading={loading.dailyRevenue}
        icon={<DollarCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
        title={t('dailyRevenue')}
        trend={dailyRevenue.trend}
      >
        <DailyRevenueChart height={CHART_HEIGHT} data={dailyRevenue.data} filter={filter} />
      </CardWithPlot>
    );
  }, [dailyRevenue.data, loading.dailyRevenue]);

  const renderDailyOrderCard = useMemo(() => {
    return (
      <CardWithPlot
        loading={loading.dailyOrder}
        icon={<ShoppingOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
        trend={dailyOrder.trend}
        title={t('dailyOrder')}
      >
        <DailyOrderChart height={CHART_HEIGHT} data={dailyOrder.data} filter={filter} />
      </CardWithPlot>
    );
  }, [dailyOrder.data, loading.dailyOrder]);

  const renderNewCustomerCard = useMemo(() => {
    return (
      <CardWithPlot
        loading={loading.dailyCustomer}
        icon={<UserOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
        title={t('newCustomer')}
        trend={dailyCustomer.trend}
      >
        <DailyCustomerChart height={CHART_HEIGHT} data={dailyCustomer.data} filter={filter} />
      </CardWithPlot>
    );
  }, [dailyCustomer.data, loading.dailyCustomer]);

  const renderRecentOrderCard = useMemo(() => {
    return (
      <CardWithContent
        bodyStyles={{ minHeight: MIN_TABLE_HEIGHT, height: TABLE_HEIGHT, overflow: 'hidden', padding: 0 }}
        icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
        title={t('recentOrder')}
      >
        <RecentOrderTable
          height={RECENT_ORDER_TABLE_HEIGHT}
          data={recentOrder}
          loading={loading.recentOrder}
          dispatch={{
            fetchRecentOrder: dispatch?.fetchRecentOrder || Promise.resolve,
          }}
        />
      </CardWithContent>
    );
  }, [recentOrder, loading.recentOrder]);

  const renderOrderTimelineCard = useMemo(() => {
    return (
      <CardWithContent
        bodyStyles={{ minHeight: MIN_TABLE_HEIGHT, height: TABLE_HEIGHT, overflow: 'hidden', padding: 0 }}
        icon={<ClockCircleOutlined style={{ fontSize: 14, color: token.colorPrimary }} />}
        title={t('orderTimeline')}
      >
        <OrderTimelineTable
          data={orderTimeline}
          loading={loading.orderTimeline}
          height={TABLE_HEIGHT}
          dispatch={{
            fetchNextPage: dispatch?.fetchOrderTimelineNext || Promise.resolve,
          }}
        />
      </CardWithContent>
    );
  }, [loading.orderTimeline, orderTimeline]);

  return (
    <DashboardStyled>
      <div className="header">
        <Typography.Title level={4} style={{ margin: '0 0 16px' }}>
          {t('overview')}
        </Typography.Title>
        <DateFilterSelect onChange={dispatch?.fetchChartData} />
      </div>
      <Row gutter={[THC.DASHBOARD_PAGE.TABLE_CHART_SPACE, THC.DASHBOARD_PAGE.TABLE_CHART_SPACE]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              {renderDailyRevenueCard}
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              {renderDailyOrderCard}
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              {renderNewCustomerCard}
            </Col>
          </Row>
        </Col>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          {renderRecentOrderCard}
        </Col>
        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
          {renderOrderTimelineCard}
        </Col>
      </Row>
    </DashboardStyled>
  );
};
