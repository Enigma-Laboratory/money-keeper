import React, { useMemo, useTransition } from 'react';
import { DashboardStyled } from './Dashboard.styles';
import dayjs from 'dayjs';
import { DashboardProps } from './withDashboardController';
import { DailyRevenue } from './dailyRevenue';
import { Col, Flex, Row, Typography, theme } from 'antd';
import { CardWithContent, CardWithPlot } from 'components/CardWithPlot';
import {
  ClockCircleOutlined,
  DollarCircleOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { TrendDownIcon, TrendUpIcon } from 'assets/icons';
import { useTranslation } from 'react-i18next';
import { DailyOrders } from './dailyOrders';
import { NewCustomers } from './newCustomers';
import { OrderTimeline } from './orderTimeline';
import { RecentOrders } from './recentOrders';

export const DashboardPage = ({ data, dispatch }: DashboardProps) => {
  const { orders: orderTimelines, dailyRevenueData, dailyOrdersData, newCustomersData } = data || {};

  const { token } = theme.useToken();
  const { t } = useTranslation();

  const revenue = useMemo(() => {
    const data = dailyRevenueData?.data?.data;
    if (!data)
      return {
        data: [],
        trend: 0,
      };

    const plotData = data.map((revenue) => {
      const date = dayjs(revenue.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format('DD MMM YYYY'),
        value: revenue.value,
        state: 'Daily Revenue',
      };
    });

    return {
      data: plotData,
      trend: dailyRevenueData?.data?.trend || 0,
    };
  }, [dailyRevenueData]);

  const orders = useMemo(() => {
    const data = dailyOrdersData?.data?.data;
    if (!data) return { data: [], trend: 0 };

    const plotData = data.map((order) => {
      const date = dayjs(order.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format('DD MMM YYYY'),
        value: order.value,
        state: 'Daily Orders',
      };
    });

    return {
      data: plotData,
      trend: dailyOrdersData?.data?.trend || 0,
    };
  }, [dailyOrdersData]);

  const newCustomers = useMemo(() => {
    const data = newCustomersData?.data?.data;
    if (!data) return { data: [], trend: 0 };

    const plotData = data.map((customer) => {
      const date = dayjs(customer.date);
      return {
        timeUnix: date.unix(),
        timeText: date.format('DD MMM YYYY'),
        value: customer.value,
        state: 'New Customers',
      };
    });

    return {
      data: plotData,
      trend: newCustomersData?.data?.trend || 0,
    };
  }, [newCustomersData]);

  return (
    <DashboardStyled>
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 10 }} lg={24} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <DollarCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t('dashboard.dailyRevenue.title')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>
                      {revenue.trend.toLocaleString('us', { style: 'currency', currency: 'USD' })}
                    </Typography.Text>
                    {revenue.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <DailyRevenue height={170} data={revenue.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <ShoppingOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{orders.trend}</Typography.Text>
                    {orders.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
                title={t('dashboard.dailyOrders.title')}
              >
                <DailyOrders height={170} data={orders.data} />
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 7 }} lg={12} md={24} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <UserOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }}
                  />
                }
                title={t('dashboard.newCustomers.title')}
                rightSlot={
                  <Flex align="center" gap={8}>
                    <Typography.Text>{`${newCustomers.trend / 100}%`}</Typography.Text>

                    {newCustomers.trend > 0 ? <TrendUpIcon /> : <TrendDownIcon />}
                  </Flex>
                }
              >
                <NewCustomers height={170} data={newCustomers.data} />
              </CardWithPlot>
            </Col>
          </Row>
        </Col>
        <Col xl={15} lg={15} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              height: '432px',
              overflow: 'hidden',
              padding: 0,
            }}
            icon={
              <ClockCircleOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t('dashboard.recentOrders.title')}
          >
            <RecentOrders
              data={{
                orders: orderTimelines,
              }}
              dispatch={{}}
            />
          </CardWithContent>
        </Col>
        <Col xl={9} lg={9} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              height: '430px',
              overflow: 'hidden',
              padding: 0,
            }}
            icon={
              <ClockCircleOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }}
              />
            }
            title={t('dashboard.timeline.title')}
          >
            <OrderTimeline
              data={{
                orders: orderTimelines,
                height: undefined,
                hasNextPage: undefined,
                isLoading: undefined,
              }}
              dispatch={{
                fetchNextPage: function (): void {
                  throw new Error('Function not implemented.');
                },
              }}
            />
          </CardWithContent>
        </Col>
      </Row>
    </DashboardStyled>
  );
};
