import { ReactElement, useMemo } from 'react';
import React from 'react';
import { Space, Spin, Table, Typography } from 'antd';
import type { TableProps } from 'antd/es/table';
import { OrderProps } from './withOrderController';
import { OrderStyled } from './Order.styles';
import { BaseButton } from 'components';
import { useNavigate } from 'react-router-dom';
import { routePaths } from 'routes/routeComponent';
import { getExactPath } from 'utils/getExactPath';
import { IOrder } from '/interface';
import { useTranslation } from 'react-i18next';
import { OrderStatus } from 'components/OrderStatus';
import { InsertRowRightOutlined } from '@ant-design/icons';

interface DataType {
  key: string;
  user: string;
  name: string;
  createdAt: Date;
}

const mockOrderTimeLine = [
  {
    id: 282,
    user: {
      id: 426,
      firstName: 'Myah',
      lastName: 'Koelpin',
      fullName: 'Myah Koelpin',
      gender: 'Female',
      gsm: '(906) 894-2348',
      createdAt: '2024-03-20T14:41:05.215Z',
      isActive: false,
      avatar: [
        {
          name: 'e76de50e-3318-4ecc-8e65-ad4952741b70',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '4ed516f6-5ee3-44b9-918e-d417a4b9f53a',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1233.jpg',
        },
      ],
      addresses: [
        {
          text: '11250 Kaci Forge, Massapequa, NY 11061',
          coordinate: ['40.84059212546516', '-73.90423438663407'],
        },
        {
          text: '11965 Estevan Heights, Brooklyn, NY 11272',
          coordinate: ['40.67146669345091', '-73.99857675001128'],
        },
        {
          text: '11863 Yesenia Estates, Brooklyn, NY 11585',
          coordinate: ['40.70375488695111', '-73.81211352611008'],
        },
      ],
    },
    amount: 32,
    createdAt: '2024-04-16T07:24:11.319Z',
    products: [
      {
        id: 32,
        name: 'Lamb',
        isActive: false,
        description: 'Grilled lamb skewers marinated in a Mediterranean spice mix, served with tzatziki sauce.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/lamb.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/lamb-thumbnail.jpg',
            name: 'Lamb',
            status: 'done',
            type: 'image/jpg',
            uid: '6c8738a2-8b7f-4651-bd3a-0220e3e97c85',
          },
        ],
        createdAt: '2024-02-15T03:06:16.002Z',
        price: 20,
        category: {
          id: 7,
        },
      },
      {
        id: 44,
        name: 'Sprite',
        isActive: true,
        description: 'Crisp and refreshing lemon-lime Sprite.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/sprite.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/sprite-thumbnail.jpg',
            name: 'Sprite',
            status: 'done',
            type: 'image/jpg',
            uid: '3e2d899b-aef5-4808-986f-4625a2652476',
          },
        ],
        createdAt: '2024-02-17T16:23:22.878Z',
        price: 2,
        category: {
          id: 9,
        },
      },
      {
        id: 76,
        name: 'Caprese Salad',
        isActive: true,
        description:
          'Fresh slices of mozzarella cheese, ripe tomatoes, and basil leaves, drizzled with a balsamic glaze and extra virgin olive oil. A refreshing start to your meal.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/caprese-salad.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/caprese-salad-thumbnail.jpg',
            name: 'Caprese Salad',
            status: 'done',
            type: 'image/jpg',
            uid: '7750d05b-3436-469a-841b-ecf494da1a10',
          },
        ],
        createdAt: '2023-11-23T01:44:34.155Z',
        price: 10,
        category: {
          id: 1,
        },
      },
    ],
    status: {
      id: 4,
      text: 'Delivered',
    },
    adress: {
      text: '11863 Yesenia Estates, Brooklyn, NY 11585',
      coordinate: ['40.70375488695111', '-73.81211352611008'],
    },
    store: {
      id: 10,
      title: 'Bernhard Mission',
      email: 'Lessie.McGlynn90@gmail.com',
      gsm: '(155) 712-0530',
      isActive: false,
      createdAt: '2023-04-21T10:06:29.914Z',
      address: {
        text: '11741 Liza Ridges, Lindenhurst, NY 11950',
        coordinate: ['40.74280724377413', '-73.9590214266107'],
      },
      products: [],
    },
    courier: {
      id: 8,
      name: 'Yoshiko Legros',
      email: 'Murl_Cruickshank@yahoo.com',
      gender: 'Female',
      gsm: '(304) 916-1107',
      createdAt: '2023-05-04T14:51:01.824Z',
      accountNumber: 1407832653,
      licensePlate: 'XLH 665',
      address: '11200 Leonard Park, Lindenhurst, NY 11275',
      store: {
        id: 1,
        title: 'Moriah Meadows',
        email: 'Audie.Gerlach81@yahoo.com',
        gsm: '(588) 721-9535',
        isActive: false,
        createdAt: '2023-10-30T10:57:10.227Z',
        address: {
          text: '11781 Camryn Lodge, Brooklyn, NY 11082',
          coordinate: ['40.66724895805104', '-73.8904138904937'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
      },
      vehicle: {
        model: 'Yamaha XMAX 300',
        vehicleType: 'Scooter',
        engineSize: 292,
        color: 'Gray',
        year: 2024,
        id: 7,
      },
      avatar: [
        {
          name: 'd6318e86-06f9-4bbf-8c92-6d41f9459e78',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'd46e8fc8-17ba-466b-a678-f9770227f331',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/620.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T07:24:11.319Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T07:31:11.319Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T07:32:11.319Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T07:42:11.319Z',
        status: 'Delivered',
      },
    ],
    orderNumber: 526986,
  },
  {
    id: 1094,
    user: {
      id: 495,
      firstName: 'Henderson',
      lastName: 'Langworth',
      fullName: 'Henderson Langworth',
      gender: 'Female',
      gsm: '(551) 852-1949',
      createdAt: '2024-03-27T09:07:39.416Z',
      isActive: false,
      avatar: [
        {
          name: 'e2fd4b07-5ad2-4e80-b09a-20cf45ec07d2',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '82caf4fd-bfe5-4dae-9551-537132089d32',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/776.jpg',
        },
      ],
      addresses: [
        {
          text: '11860 Block Vista, Brooklyn, NY 11967',
          coordinate: ['40.83876874812532', '-73.84573741993142'],
        },
        {
          text: '11239 Langosh Court, Brooklyn, NY 11086',
          coordinate: ['40.69314003062283', '-73.79223286677576'],
        },
        {
          text: '11123 Sawayn Mall, Brooklyn, NY 11394',
          coordinate: ['40.608996492698786', '-74.1041680183055'],
        },
      ],
    },
    amount: 8,
    createdAt: '2024-04-16T06:50:25.410Z',
    products: [
      {
        id: 43,
        name: 'Cheesecake',
        isActive: true,
        description:
          'Creamy cheesecake on a graham cracker crust, with a choice of strawberry, blueberry, or raspberry topping.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cheesecake.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cheesecake-thumbnail.jpg',
            name: 'Cheesecake',
            status: 'done',
            type: 'image/jpg',
            uid: '8ea3fce5-0516-461c-b52f-bddecc5a9c0f',
          },
        ],
        createdAt: '2023-06-02T01:16:44.467Z',
        price: 8,
        category: {
          id: 5,
        },
      },
    ],
    status: {
      id: 5,
      text: 'Cancelled',
    },
    adress: {
      text: '11239 Langosh Court, Brooklyn, NY 11086',
      coordinate: ['40.69314003062283', '-73.79223286677576'],
    },
    store: {
      id: 6,
      title: 'Bergnaum Unions',
      email: 'Maximo.Senger67@gmail.com',
      gsm: '(621) 994-7548',
      isActive: false,
      createdAt: '2023-09-26T21:21:54.254Z',
      address: {
        text: '11689 Cronin Bridge, Lindenhurst, NY 11827',
        coordinate: ['40.795839930328334', '-73.95566862970924'],
      },
      products: [],
    },
    courier: {
      id: 16,
      name: 'Diana Torphy',
      email: 'Arturo_Funk92@gmail.com',
      gender: 'Female',
      gsm: '(251) 616-7224',
      createdAt: '2023-10-09T09:19:31.309Z',
      accountNumber: 3687538258,
      licensePlate: 'YOA 660',
      address: '11832 Terry Rue, Massapequa, NY 11236',
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
      status: {
        id: 3,
        text: 'On delivery',
      },
      vehicle: {
        model: 'Sym Crox 200i',
        vehicleType: 'Off-Road Scooter',
        engineSize: 175,
        color: 'Green',
        year: 2020,
        id: 15,
      },
      avatar: [
        {
          name: '90071d5d-81b8-428a-9a54-b9e1bef6951a',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '8782aee0-b6f2-42ae-812c-e78b0cfeaa52',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/354.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T06:50:25.410Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T06:54:25.410Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T06:55:25.410Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T06:58:25.410Z',
        status: 'Cancelled',
      },
    ],
    orderNumber: 599144,
  },
  {
    id: 119,
    user: {
      id: 323,
      firstName: 'Stevie',
      lastName: 'Nicolas',
      fullName: 'Stevie Nicolas',
      gender: 'Male',
      gsm: '(527) 644-5409',
      createdAt: '2024-04-15T08:41:17.305Z',
      isActive: true,
      avatar: [
        {
          name: '0e599804-7ca1-4f2c-8697-8777e0f31f24',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '255bcb2b-b009-4d3b-b948-8bc2ff705b4a',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/79.jpg',
        },
      ],
      addresses: [
        {
          text: '11572 Candice Place, Brooklyn, NY 11153',
          coordinate: ['40.75088529963312', '-73.97113850511921'],
        },
        {
          text: '11148 Sporer Run, Lindenhurst, NY 11533',
          coordinate: ['40.6323578297451', '-73.88735902253855'],
        },
        {
          text: '11860 Block Vista, Brooklyn, NY 11967',
          coordinate: ['40.83876874812532', '-73.84573741993142'],
        },
      ],
    },
    amount: 31.5,
    createdAt: '2024-04-16T06:39:14.960Z',
    products: [
      {
        id: 22,
        name: 'Donuts',
        isActive: false,
        description: 'Soft and fluffy donuts, available in classic sugar, chocolate glazed, and filled varieties.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/donuts.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/donuts-thumbnail.jpg',
            name: 'Donuts',
            status: 'done',
            type: 'image/jpg',
            uid: 'afbd82ee-5c3d-4e7c-b596-04ac732c678b',
          },
        ],
        createdAt: '2023-09-11T11:47:22.726Z',
        price: 2.5,
        category: {
          id: 5,
        },
      },
      {
        id: 61,
        name: 'Edamame',
        isActive: true,
        description:
          'Steamed young soybeans sprinkled with sea salt. A simple, healthy, and flavorful snack to get your meal started.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/edamame.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/edamame-thumbnail.jpg',
            name: 'Edamame',
            status: 'done',
            type: 'image/jpg',
            uid: 'a1d14ffc-4073-4e75-b549-0eea78361c18',
          },
        ],
        createdAt: '2023-11-04T17:46:42.759Z',
        price: 5,
        category: {
          id: 1,
        },
      },
      {
        id: 65,
        name: 'Pappardelle',
        isActive: false,
        description: 'Broad, flat pasta served with a variety of hearty sauces, often meat-based.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-10.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-10-thumbnail.jpg',
            name: 'Pappardelle',
            status: 'done',
            type: 'image/jpg',
            uid: '94f281f9-1035-45e8-9aef-9facfe10ac02',
          },
        ],
        createdAt: '2023-06-24T11:02:30.276Z',
        price: 14,
        category: {
          id: 2,
        },
      },
      {
        id: 78,
        name: 'Greek Salad',
        isActive: false,
        description:
          'Tomatoes, cucumbers, onions, olives, and feta cheese, dressed with olive oil and herbs. A refreshing Mediterranean option.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-2.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-2-thumbnail.jpg',
            name: 'Greek Salad',
            status: 'done',
            type: 'image/jpg',
            uid: '189fbe84-08bc-4b92-8341-cbd0b43415c1',
          },
        ],
        createdAt: '2023-04-27T08:50:00.000Z',
        price: 10,
        category: {
          id: 6,
        },
      },
    ],
    status: {
      id: 5,
      text: 'Cancelled',
    },
    adress: {
      text: '11860 Block Vista, Brooklyn, NY 11967',
      coordinate: ['40.83876874812532', '-73.84573741993142'],
    },
    store: {
      id: 1,
      title: 'Moriah Meadows',
      email: 'Audie.Gerlach81@yahoo.com',
      gsm: '(588) 721-9535',
      isActive: false,
      createdAt: '2023-10-30T10:57:10.227Z',
      address: {
        text: '11781 Camryn Lodge, Brooklyn, NY 11082',
        coordinate: ['40.66724895805104', '-73.8904138904937'],
      },
      products: [],
    },
    courier: {
      id: 21,
      name: 'Rodrick Jacobs',
      email: 'Alison53@hotmail.com',
      gender: 'Female',
      gsm: '(006) 400-1886',
      createdAt: '2023-04-20T17:19:39.486Z',
      accountNumber: 3061388296,
      licensePlate: 'INK 131',
      address: '11844 Rau Via, Lindenhurst, NY 11121',
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
      status: {
        id: 2,
        text: 'Offline',
      },
      vehicle: {
        model: 'Honda CB500F',
        vehicleType: 'Motorcycle',
        engineSize: 471,
        color: 'Red',
        year: 2023,
        id: 1,
      },
      avatar: [
        {
          name: '553ee5dc-3f7b-419b-867c-91d6f2fd78ad',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '124fc46e-5d66-4c7f-9d7d-c28b15a55336',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/31.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T06:39:14.960Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T06:47:14.960Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T06:48:14.960Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T06:57:14.960Z',
        status: 'Cancelled',
      },
    ],
    orderNumber: 781835,
  },
  {
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
  },
  {
    id: 364,
    user: {
      id: 88,
      firstName: 'Bernadette',
      lastName: 'Kuhlman',
      fullName: 'Bernadette Kuhlman',
      gender: 'Male',
      gsm: '(101) 204-8507',
      createdAt: '2024-04-02T17:25:13.129Z',
      isActive: false,
      avatar: [
        {
          name: 'f017fe27-c239-4d03-84f6-75182fd893c3',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'ca7d9e37-0b4b-45bf-a81c-29f6db5d487e',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/950.jpg',
        },
      ],
      addresses: [
        {
          text: '11664 Gutmann Summit, Lindenhurst, NY 11360',
          coordinate: ['40.78264342020309', '-73.90854229279272'],
        },
        {
          text: '11239 Langosh Court, Brooklyn, NY 11086',
          coordinate: ['40.69314003062283', '-73.79223286677576'],
        },
        {
          text: '11276 Stanton Expressway, Massapequa, NY 11826',
          coordinate: ['40.54387816202007', '-74.16071777218971'],
        },
      ],
    },
    amount: 23,
    createdAt: '2024-04-16T05:52:31.377Z',
    products: [
      {
        id: 19,
        name: 'Grilled Chicken',
        isActive: false,
        description: 'Perfectly grilled chicken breast, marinated in herbs and spices.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/chicken-grilled.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/chicken-grilled-thumbnail.jpg',
            name: 'Grilled Chicken',
            status: 'done',
            type: 'image/jpg',
            uid: '2ce9eba5-8ae6-4516-b22a-75258c808ecf',
          },
        ],
        createdAt: '2023-10-17T17:59:12.888Z',
        price: 13,
        category: {
          id: 8,
        },
      },
      {
        id: 46,
        name: 'Bacon Cheeseburger',
        isActive: false,
        description:
          'Our Cheeseburger made even better with crispy bacon strips. For those who love a smoky flavor with their meal.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-3.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-3-thumbnail.jpg',
            name: 'Bacon Cheeseburger',
            status: 'done',
            type: 'image/jpg',
            uid: '44d92964-e045-4596-9695-5137f4d06386',
          },
        ],
        createdAt: '2023-08-11T11:52:41.060Z',
        price: 10,
        category: {
          id: 4,
        },
      },
    ],
    status: {
      id: 4,
      text: 'Delivered',
    },
    adress: {
      text: '11239 Langosh Court, Brooklyn, NY 11086',
      coordinate: ['40.69314003062283', '-73.79223286677576'],
    },
    store: {
      id: 20,
      title: 'Donato Grove',
      email: 'Rudy.Willms@gmail.com',
      gsm: '(955) 573-2407',
      isActive: false,
      createdAt: '2023-05-14T10:12:45.796Z',
      address: {
        text: '11891 Harris Oval, Lindenhurst, NY 11849',
        coordinate: ['40.574387602204446', '-73.93035803346234'],
      },
      products: [],
    },
    courier: {
      id: 9,
      name: 'Erick Murray',
      email: 'Cordell_Hammes@gmail.com',
      gender: 'Male',
      gsm: '(539) 907-0840',
      createdAt: '2023-08-25T12:17:08.719Z',
      accountNumber: 7928608111,
      licensePlate: 'RBT 924',
      address: '11202 Abraham Creek, Lindenhurst, NY 11706',
      store: {
        id: 8,
        title: 'Rafaela Dale',
        email: 'Sydnee_Farrell2@yahoo.com',
        gsm: '(829) 244-3011',
        isActive: true,
        createdAt: '2023-11-09T04:05:07.503Z',
        address: {
          text: '11440 Crist Rapid, Massapequa, NY 11853',
          coordinate: ['40.822794212271795', '-73.9215802047409'],
        },
        products: [],
      },
      status: {
        id: 3,
        text: 'On delivery',
      },
      vehicle: {
        model: 'Honda CB500F',
        vehicleType: 'Motorcycle',
        engineSize: 471,
        color: 'Red',
        year: 2023,
        id: 1,
      },
      avatar: [
        {
          name: 'c909c070-7ea4-47ce-a65e-2b92d3990b0e',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'a98a3274-6c65-4a84-961a-258e1dc522ca',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/685.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T05:52:31.377Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T06:00:31.377Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T06:03:31.377Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T06:07:31.377Z',
        status: 'Delivered',
      },
    ],
    orderNumber: 777215,
  },
  {
    id: 356,
    user: {
      id: 310,
      firstName: 'Maximillia',
      lastName: 'Auer',
      fullName: 'Maximillia Auer',
      gender: 'Female',
      gsm: '(748) 012-0112',
      createdAt: '2024-04-08T09:29:01.636Z',
      isActive: false,
      avatar: [
        {
          name: 'cd7a2be3-857e-41e6-b21e-b2264711612b',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'b85304ae-b056-4cdb-99c9-d2864264c8f7',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/610.jpg',
        },
      ],
      addresses: [
        {
          text: '11382 Koepp Track, Brooklyn, NY 11666',
          coordinate: ['40.706643561657394', '-73.95565150452512'],
        },
        {
          text: '11359 Beryl Gardens, Massapequa, NY 11931',
          coordinate: ['40.82390621414222', '-73.95871907693304'],
        },
        {
          text: '11660 Kianna Orchard, Brooklyn, NY 11602',
          coordinate: ['40.67730026126167', '-73.77390792114971'],
        },
      ],
    },
    amount: 8.5,
    createdAt: '2024-04-16T05:43:41.293Z',
    products: [
      {
        id: 35,
        name: 'Hot Chocolate',
        isActive: true,
        description: 'Warm and creamy hot chocolate, topped with whipped cream.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hot-chocolate.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hot-chocolate-thumbnail.jpg',
            name: 'Hot Chocolate',
            status: 'done',
            type: 'image/jpg',
            uid: 'da9c5c12-3e03-43db-bd03-a1e7f89d856e',
          },
        ],
        createdAt: '2023-07-14T19:07:35.624Z',
        price: 3.5,
        category: {
          id: 10,
        },
      },
      {
        id: 61,
        name: 'Edamame',
        isActive: true,
        description:
          'Steamed young soybeans sprinkled with sea salt. A simple, healthy, and flavorful snack to get your meal started.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/edamame.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/edamame-thumbnail.jpg',
            name: 'Edamame',
            status: 'done',
            type: 'image/jpg',
            uid: 'a1d14ffc-4073-4e75-b549-0eea78361c18',
          },
        ],
        createdAt: '2023-11-04T17:46:42.759Z',
        price: 5,
        category: {
          id: 1,
        },
      },
    ],
    status: {
      id: 3,
      text: 'On The Way',
    },
    adress: {
      text: '11382 Koepp Track, Brooklyn, NY 11666',
      coordinate: ['40.706643561657394', '-73.95565150452512'],
    },
    store: {
      id: 6,
      title: 'Bergnaum Unions',
      email: 'Maximo.Senger67@gmail.com',
      gsm: '(621) 994-7548',
      isActive: false,
      createdAt: '2023-09-26T21:21:54.254Z',
      address: {
        text: '11689 Cronin Bridge, Lindenhurst, NY 11827',
        coordinate: ['40.795839930328334', '-73.95566862970924'],
      },
      products: [],
    },
    courier: {
      id: 56,
      name: 'Jayce Lindgren',
      email: 'Shyann91@gmail.com',
      gender: 'Female',
      gsm: '(960) 809-7408',
      createdAt: '2023-11-15T21:37:07.579Z',
      accountNumber: 5057634125,
      licensePlate: 'WUA 650',
      address: '11262 Parker Terrace, Massapequa, NY 11521',
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
        model: 'Yamaha XMAX 300',
        vehicleType: 'Scooter',
        engineSize: 292,
        color: 'Gray',
        year: 2024,
        id: 7,
      },
      avatar: [
        {
          name: 'ead09981-8b84-4796-9410-967bf17964c8',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '1af9c47c-1cc1-4435-b9be-ebd77180cd63',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/649.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T05:43:41.293Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T05:51:41.293Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T05:53:41.293Z',
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 216171,
  },
  {
    id: 713,
    user: {
      id: 512,
      firstName: 'Estel',
      lastName: 'Terry',
      fullName: 'Estel Terry',
      gender: 'Male',
      gsm: '(495) 121-0931',
      createdAt: '2024-03-24T07:53:19.184Z',
      isActive: true,
      avatar: [
        {
          name: '1c7393a3-cab1-44a9-a79a-ac9f8106f5ac',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '9aec0131-9451-4c24-b349-6ea815aaab23',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1028.jpg',
        },
      ],
      addresses: [
        {
          text: '11516 Angela Flats, Brooklyn, NY 11484',
          coordinate: ['40.74648511045947', '-73.91861812177368'],
        },
        {
          text: '11838 Schmidt Lock, Massapequa, NY 11545',
          coordinate: ['40.68255750328585', '-73.98450025628267'],
        },
        {
          text: '11318 Laverna Mews, Lindenhurst, NY 11646',
          coordinate: ['40.49052760080315', '-74.22836088670515'],
        },
      ],
    },
    amount: 17.5,
    createdAt: '2024-04-16T05:06:11.969Z',
    products: [
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
        id: 77,
        name: 'House Salad',
        isActive: true,
        description:
          'A blend of fresh greens, tomatoes, cucumbers, onions, and carrots. Served with your choice of dressing.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-8.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/salad-8-thumbnail.jpg',
            name: 'House Salad',
            status: 'done',
            type: 'image/jpg',
            uid: '34ae5fc5-4d44-41ef-8c40-e6be58e5bef1',
          },
        ],
        createdAt: '2024-04-17T10:59:01.024Z',
        price: 8,
        category: {
          id: 6,
        },
      },
    ],
    status: {
      id: 5,
      text: 'Cancelled',
    },
    adress: {
      text: '11838 Schmidt Lock, Massapequa, NY 11545',
      coordinate: ['40.68255750328585', '-73.98450025628267'],
    },
    store: {
      id: 7,
      title: 'Fletcher Neck',
      email: 'Helga_Pouros83@yahoo.com',
      gsm: '(190) 097-6023',
      isActive: true,
      createdAt: '2024-04-07T08:12:47.334Z',
      address: {
        text: '11919 McKenzie Prairie, Massapequa, NY 11607',
        coordinate: ['40.743164188430185', '-73.98137042064778'],
      },
      products: [],
    },
    courier: {
      id: 35,
      name: 'Joelle Bradtke',
      email: 'Rashawn.Kiehn@gmail.com',
      gender: 'Male',
      gsm: '(230) 513-8170',
      createdAt: '2023-09-29T05:07:34.794Z',
      accountNumber: 4097123493,
      licensePlate: 'VTS 658',
      address: '11976 Taryn Ports, Lindenhurst, NY 11111',
      store: {
        id: 8,
        title: 'Rafaela Dale',
        email: 'Sydnee_Farrell2@yahoo.com',
        gsm: '(829) 244-3011',
        isActive: true,
        createdAt: '2023-11-09T04:05:07.503Z',
        address: {
          text: '11440 Crist Rapid, Massapequa, NY 11853',
          coordinate: ['40.822794212271795', '-73.9215802047409'],
        },
        products: [],
      },
      status: {
        id: 2,
        text: 'Offline',
      },
      vehicle: {
        model: 'Honda CB500F',
        vehicleType: 'Motorcycle',
        engineSize: 471,
        color: 'Red',
        year: 2023,
        id: 1,
      },
      avatar: [
        {
          name: 'a328e0db-be1d-4831-8e9e-e31eaf2a07de',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '61a95cf3-dd32-447c-af3f-856537d51dc6',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1108.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T05:06:11.969Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T05:14:11.969Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T05:17:11.969Z',
        status: 'On The Way',
      },
      {
        date: '2024-04-16T05:25:11.969Z',
        status: 'Cancelled',
      },
    ],
    orderNumber: 199698,
  },
  {
    id: 1054,
    user: {
      id: 22,
      firstName: 'Paula',
      lastName: 'Champlin',
      fullName: 'Paula Champlin',
      gender: 'Female',
      gsm: '(250) 643-1663',
      createdAt: '2024-04-01T06:40:19.621Z',
      isActive: false,
      avatar: [
        {
          name: '16a317da-f7bc-4161-946c-34c8527e3c1a',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'd4898dd9-c802-450c-b5a5-2056749937fc',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/823.jpg',
        },
      ],
      addresses: [
        {
          text: '11366 Krajcik Union, Brooklyn, NY 11579',
          coordinate: ['40.58995458607029', '-73.9790743989913'],
        },
        {
          text: '11072 Madonna Trail, Brooklyn, NY 11601',
          coordinate: ['40.61053789218008', '-73.75236018477636'],
        },
        {
          text: '11936 Lolita Manors, Lindenhurst, NY 11768',
          coordinate: ['40.66487420454871', '-73.90600010079577'],
        },
      ],
    },
    amount: 34,
    createdAt: '2024-04-16T04:13:43.355Z',
    products: [
      {
        id: 22,
        name: 'Donuts',
        isActive: false,
        description: 'Soft and fluffy donuts, available in classic sugar, chocolate glazed, and filled varieties.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/donuts.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/donuts-thumbnail.jpg',
            name: 'Donuts',
            status: 'done',
            type: 'image/jpg',
            uid: 'afbd82ee-5c3d-4e7c-b596-04ac732c678b',
          },
        ],
        createdAt: '2023-09-11T11:47:22.726Z',
        price: 2.5,
        category: {
          id: 5,
        },
      },
      {
        id: 35,
        name: 'Hot Chocolate',
        isActive: true,
        description: 'Warm and creamy hot chocolate, topped with whipped cream.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hot-chocolate.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hot-chocolate-thumbnail.jpg',
            name: 'Hot Chocolate',
            status: 'done',
            type: 'image/jpg',
            uid: 'da9c5c12-3e03-43db-bd03-a1e7f89d856e',
          },
        ],
        createdAt: '2023-07-14T19:07:35.624Z',
        price: 3.5,
        category: {
          id: 10,
        },
      },
      {
        id: 57,
        name: 'Hawaiian Pizza',
        isActive: true,
        description: 'A tropical treat topped with ham, pineapple, and mozzarella cheese.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hawaiian-pizza.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/hawaiian-pizza-thumbnail.jpg',
            name: 'Hawaiian Pizza',
            status: 'done',
            type: 'image/jpg',
            uid: 'c1e39837-c55b-4fc4-bb8c-c62fd718b6b0',
          },
        ],
        createdAt: '2023-05-16T06:37:05.858Z',
        price: 14.5,
        category: {
          id: 3,
        },
      },
      {
        id: 62,
        name: 'Linguine Pesto',
        isActive: true,
        description:
          'Thin, flat pasta served with a sauce made from basil, garlic, pine nuts, Parmesan cheese, and olive oil.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-4.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-4-thumbnail.jpg',
            name: 'Linguine Pesto',
            status: 'done',
            type: 'image/jpg',
            uid: 'ec182f3f-83a7-428a-84bb-b5161664c333',
          },
        ],
        createdAt: '2024-02-22T05:35:53.454Z',
        price: 13.5,
        category: {
          id: 2,
        },
      },
    ],
    status: {
      id: 3,
      text: 'On The Way',
    },
    adress: {
      text: '11366 Krajcik Union, Brooklyn, NY 11579',
      coordinate: ['40.58995458607029', '-73.9790743989913'],
    },
    store: {
      id: 17,
      title: 'Rodrick Pass',
      email: 'Marge.Adams@yahoo.com',
      gsm: '(714) 642-6285',
      isActive: false,
      createdAt: '2023-07-19T18:41:50.284Z',
      address: {
        text: '11806 Jewell Plains, Massapequa, NY 11774',
        coordinate: ['40.54030737832248', '-74.17070466402753'],
      },
      products: [],
    },
    courier: {
      id: 24,
      name: 'Concepcion Schmidt',
      email: 'Bart.Weissnat@hotmail.com',
      gender: 'Male',
      gsm: '(587) 824-7555',
      createdAt: '2023-04-30T08:22:48.698Z',
      accountNumber: 7297358903,
      licensePlate: 'BJT 140',
      address: '11620 Konopelski Coves, Massapequa, NY 11936',
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
          name: 'ebaaf471-8f74-47ab-b47d-7682ba0527aa',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '6af21d2d-c3e2-4d78-a97a-a0db7cc68ee3',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/881.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T04:13:43.355Z',
        status: 'Pending',
      },
      {
        date: '2024-04-16T04:19:43.355Z',
        status: 'Ready',
      },
      {
        date: '2024-04-16T04:22:43.355Z',
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 965771,
  },
];

export const Orders = (props: OrderProps): ReactElement => {
  const { data } = props;
  const { isLoading = true, orders = [] } = data || {};
  const navigate = useNavigate();
  const { t } = useTranslation();

  const columns: TableProps<IOrder>['columns'] = [
    {
      title: t('order.fields.orderNumber', 'Order Number'),
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      render: (value) => (
        <Typography.Text
          style={{
            whiteSpace: 'nowrap',
          }}
        >
          #{value}
        </Typography.Text>
      ),
    },
    {
      title: t('orders.fields.status', 'Status'),
      dataIndex: 'status',
      key: 'status',
      render: (value) => <OrderStatus status={value.text} />,
    },
    // {
    //   title: t('orders.fields.products', 'Products'),
    //   dataIndex: 'products',
    //   key: 'products',
    // },
    {
      title: t('orders.fields.amount', 'Amount'),
      dataIndex: 'amount',
      key: 'amount',
      render: (value) => <Typography.Text>{value}VND</Typography.Text>,
    },
    {
      title: t('orders.fields.store', 'Store'),
      dataIndex: 'store',
    },
    {
      title: t('orders.fields.customer', 'Customer'),
      dataIndex: 'createdAt',
    },
  ];

  const dataSource: DataType[] = useMemo(
    () =>
      orders.map((order) => {
        return {
          key: order._id,
          user: order.userId,
          name: order.name,
          createdAt: order.createdAt,
        };
      }),
    [orders],
  );

  const onChange: TableProps<IOrder>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const headerOrder = () => {
    return (
      <Space>
        <Typography.Text>Orders</Typography.Text>

        <BaseButton onClick={() => navigate(routePaths.createOrder)} type="primary" icon={<InsertRowRightOutlined />}>
          {t('orders.createOrder', 'Create order')}
        </BaseButton>
      </Space>
    );
  };
  const handleClickDetailOrder = (record: any) => {
    navigate(getExactPath(routePaths.detailOrder, { id: record?.key }));
  };

  return (
    <OrderStyled>
      {headerOrder()}
      <Spin spinning={isLoading}>
        <Table
          columns={columns}
          dataSource={mockOrderTimeLine as any}
          onChange={onChange}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {
          //       handleClickDetailOrder(record);
          //     },
          //     className: 'pointer-cursor',
          //   };
          // }}
        />
      </Spin>
    </OrderStyled>
  );
};
