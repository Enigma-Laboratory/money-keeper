import { ReactElement } from 'react';
import { DetailOrderStyled } from './OrderDetail.styles';
import { DetailOrderProps } from './withOrderDetail';
import { Avatar, Col, Divider, Flex, Row, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined, LeftOutlined } from '@ant-design/icons';
import { BaseButton } from 'components';
import { getExactPath } from 'utils/getExactPath';
import { routePaths } from 'routes/routeComponent';
import { CardWithContent } from 'components/CardWithPlot';
import { useTranslation } from 'react-i18next';
import { OrderDetailStatus } from './orderDetailStatus';
import { OrderProducts } from './orderProducts';

export const OrderDetail = (props: DetailOrderProps): ReactElement => {
  const {
    data: { order },
    dispatch,
  } = props;
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { t } = useTranslation();

  const record = {
    id: 485,
    user: {
      id: 268,
      firstName: 'Austyn',
      lastName: 'Olson',
      fullName: 'Austyn Olson',
      gender: 'Male',
      gsm: '(793) 009-7287',
      createdAt: '2024-03-30T05:03:01.481Z',
      isActive: false,
      avatar: [
        {
          name: '5ab41f92-e556-4aa8-b6d8-49db11657612',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '341490c0-178d-4112-9156-976d0942f2c5',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/90.jpg',
        },
      ],
      addresses: [
        {
          text: '11526 Wisoky Valley, Brooklyn, NY 11445',
          coordinate: ['40.68127361567051', '-73.78746800031286'],
        },
        {
          text: '11154 Martina Pike, Brooklyn, NY 11609',
          coordinate: ['40.8268512584312', '-73.93846272803324'],
        },
        {
          text: '11682 Koss Loaf, Massapequa, NY 11277',
          coordinate: ['40.741062401383616', '-73.86001098358524'],
        },
      ],
    },
    amount: 15.5,
    createdAt: '2024-04-16T06:19:11.473Z',
    products: [
      {
        id: 7,
        name: 'Ice Cream',
        isActive: true,
        description:
          'Your choice of vanilla, chocolate, or strawberry ice cream, served with whipped cream and a cherry on top.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/ice-cream.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/ice-cream-thumbnail.jpg',
            name: 'Ice Cream',
            status: 'done',
            type: 'image/jpg',
            uid: '0fca93a9-6725-4cb0-8fb0-869d407f54bc',
          },
        ],
        createdAt: '2023-07-01T04:03:56.532Z',
        price: 4,
        category: {
          id: 5,
        },
      },
      {
        id: 25,
        name: 'Turkey Burger',
        isActive: false,
        description:
          'A lean, seasoned turkey patty with avocado, lettuce, tomato, and onion. A lighter, yet flavorful choice.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-7.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-7-thumbnail.jpg',
            name: 'Turkey Burger',
            status: 'done',
            type: 'image/jpg',
            uid: 'b82021d3-5d73-47cc-b8ef-9076d403e168',
          },
        ],
        createdAt: '2024-04-13T16:04:32.463Z',
        price: 9.5,
        category: {
          id: 4,
        },
      },
      {
        id: 66,
        name: 'Coke',
        isActive: false,
        description: 'Classic Coca-Cola served chilled.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/coke.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/coke-thumbnail.jpg',
            name: 'Coke',
            status: 'done',
            type: 'image/jpg',
            uid: 'd9c17bf1-4135-42c0-a773-b1938dab25fa',
          },
        ],
        createdAt: '2024-03-11T06:16:26.868Z',
        price: 2,
        category: {
          id: 9,
        },
      },
    ],
    status: {
      id: 4,
      text: 'Delivered',
    },
    adress: {
      text: '11682 Koss Loaf, Massapequa, NY 11277',
      coordinate: ['40.741062401383616', '-73.86001098358524'],
    },
    store: {
      id: 16,
      title: 'Jamarcus Drive',
      email: 'Raphael.Kassulke86@gmail.com',
      gsm: '(007) 752-8873',
      isActive: false,
      createdAt: '2023-10-13T12:26:12.986Z',
      address: {
        text: '11892 Hans Pines, Lindenhurst, NY 11499',
        coordinate: ['40.79132181919135', '-73.94144403405512'],
      },
      products: [],
    },
    courier: {
      id: 49,
      name: 'Keenan Goyette',
      email: 'Bryon.Haley@hotmail.com',
      gender: 'Male',
      gsm: '(278) 155-9338',
      createdAt: '2023-11-10T20:46:33.266Z',
      accountNumber: 9069956291,
      licensePlate: 'VKP 851',
      address: '11930 Parisian Port, Massapequa, NY 11891',
      store: {
        id: 9,
        title: 'Felix Way',
        email: 'Phyllis.Waelchi57@hotmail.com',
        gsm: '(293) 981-0230',
        isActive: false,
        createdAt: '2023-12-20T15:28:06.738Z',
        address: {
          text: '11845 Armstrong Grove, Lindenhurst, NY 11024',
          coordinate: ['40.81708442582223', '-73.89096434582807'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
      },
      vehicle: {
        model: 'Yamaha MT-07',
        vehicleType: 'Motorcycle',
        engineSize: 689,
        color: 'Blue',
        year: 2021,
        id: 4,
      },
      avatar: [
        {
          name: 'bd6ecdf6-0c87-4f51-a4f9-2dc2319eb136',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'e9295d29-ea25-4f36-8bf4-1cee6f304793',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/508.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T06:19:11.473Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T06:20:11.473Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T06:23:11.473Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T06:33:11.473Z',
        status: 'Delivered',
      },
    ],
    orderNumber: 317799,
  };

  const headerCreateOrder = () => {
    return (
      <Flex vertical align="start">
        <BaseButton onClick={() => navigate(-1)} type="link">
          <Avatar shape="circle" size="small" icon={<LeftOutlined />} style={{ cursor: 'pointer' }} />
        </BaseButton>
        <Divider style={{ padding: 0, margin: 5 }} />
        <Flex justify="space-between" align="center" style={{ width: '100%' }}>
          <h3>Orders $123123</h3>
          <Space align="end">
            <BaseButton
              onClick={() => {
                dispatch.deleteOrder({ _id: id });
              }}
              icon={<CloseCircleOutlined />}
              danger
            >
              Delete
            </BaseButton>
            <BaseButton
              onClick={() => {
                navigate(getExactPath(routePaths.editOrder, { id }));
              }}
              type="primary"
              icon={<CheckCircleOutlined />}
            >
              Delete
            </BaseButton>
          </Space>
        </Flex>
      </Flex>
    );
  };

  return (
    <DetailOrderStyled>
      {headerCreateOrder()}
      <Row gutter={[16, 16]}>
        <Col xl={15} lg={24} md={24} sm={24} xs={24}>
          <Flex gap={16} vertical>
            <CardWithContent
              bodyStyles={{
                height: '378px',
                overflow: 'hidden',
                padding: 0,
              }}
              title={t('orders.titles.deliveryMap')}
            >
              <OrderProducts order={record as any} />
            </CardWithContent>
          </Flex>
        </Col>

        <Col xl={9} lg={24} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              padding: 0,
            }}
            title={t('orders.titles.deliveryDetails')}
          >
            {record && <OrderDetailStatus order={record as any} />}
          </CardWithContent>
        </Col>
      </Row>
    </DetailOrderStyled>
  );
};
