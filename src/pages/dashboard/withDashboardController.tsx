import { ComponentType, useState } from 'react';
import { IOrder } from 'interface';

export type BaseRecord = {
  id?: string;
  [key: string]: any;
};

export interface CustomResponse<TData = BaseRecord> {
  data: TData;
}
export interface ISalesChart {
  date: string;
  title?: 'Order Count' | 'Order Amount';
  value: number;
}

export interface DashboardProps {
  data?: {
    isLoading: boolean;
    dailyRevenueData: CustomResponse<{
      data: ISalesChart[];
      total: number;
      trend: number;
    }>;
    dailyOrdersData: CustomResponse<{
      data: ISalesChart[];
      total: number;
      trend: number;
    }>;
    newCustomersData: CustomResponse<{
      data: ISalesChart[];
      total: number;
      trend: number;
    }>;
    orders: IOrder[];
  };
  dispatch?: {
    onFetchUser?: () => Promise<void>;
  };
}

const mockData1 = {
  data: [
    {
      date: '2024-04-09T00:00:00.000Z',
      value: 20,
    },
    {
      date: '2024-04-10T00:00:00.000Z',
      value: 21,
    },
    {
      date: '2024-04-11T00:00:00.000Z',
      value: 15,
    },
    {
      date: '2024-04-12T00:00:00.000Z',
      value: 22,
    },
    {
      date: '2024-04-13T00:00:00.000Z',
      value: 17,
    },
    {
      date: '2024-04-14T00:00:00.000Z',
      value: 21,
    },
    {
      date: '2024-04-15T00:00:00.000Z',
      value: 29,
    },
  ],
  trend: 110,
  total: 104,
};

const mockData2 = {
  data: [
    {
      date: '2024-04-09T00:00:00.000Z',
      value: 43,
    },
    {
      date: '2024-04-10T00:00:00.000Z',
      value: 31,
    },
    {
      date: '2024-04-11T00:00:00.000Z',
      value: 37,
    },
    {
      date: '2024-04-12T00:00:00.000Z',
      value: 32,
    },
    {
      date: '2024-04-13T00:00:00.000Z',
      value: 45,
    },
    {
      date: '2024-04-14T00:00:00.000Z',
      value: 37,
    },
    {
      date: '2024-04-15T00:00:00.000Z',
      value: 38,
    },
  ],
  trend: 150,
  total: 189,
};

const mockData3 = {
  data: [
    {
      date: '2024-04-09T00:00:00.000Z',
      value: 1250,
    },
    {
      date: '2024-04-10T00:00:00.000Z',
      value: 840,
    },
    {
      date: '2024-04-11T00:00:00.000Z',
      value: 917,
    },
    {
      date: '2024-04-12T00:00:00.000Z',
      value: 871,
    },
    {
      date: '2024-04-13T00:00:00.000Z',
      value: 1113,
    },
    {
      date: '2024-04-14T00:00:00.000Z',
      value: 993,
    },
    {
      date: '2024-04-15T00:00:00.000Z',
      value: 1097,
    },
  ],
  trend: 80,
  total: 4991,
};

const mockOrder = [
  {
    id: 79,
    user: {
      id: 486,
      firstName: 'Lesly',
      lastName: 'Dickinson',
      fullName: 'Lesly Dickinson',
      gender: 'Male',
      gsm: '(194) 989-1805',
      createdAt: '2024-04-01T19:20:15.149Z',
      isActive: false,
      avatar: [
        {
          name: '20f134e2-9b2a-4b39-a8cd-eb1c1614cc8f',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '93dbfb0f-da87-4ee9-a4e7-f990374ad09c',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/137.jpg',
        },
      ],
      addresses: [
        {
          text: '11473 Brice Station, Massapequa, NY 11599',
          coordinate: ['40.812233468151334', '-73.94913834730218'],
        },
        {
          text: '11818 Madge Plains, Brooklyn, NY 11408',
          coordinate: ['40.87137627086789', '-73.82540471916013'],
        },
        {
          text: '11354 Reilly Forges, Brooklyn, NY 11970',
          coordinate: ['40.56564801126027', '-74.18360583412907'],
        },
      ],
    },
    amount: 8,
    createdAt: '2024-04-16T11:20:41.517Z',
    products: [
      {
        id: 67,
        name: 'Onion Rings',
        isActive: false,
        description:
          'Thick-cut onions dipped in batter and fried to a crispy golden brown. A crunchy and sweet appetizer.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/onion-ring.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/onion-ring-thumbnail.jpg',
            name: 'Onion Rings',
            status: 'done',
            type: 'image/jpg',
            uid: 'e79bcefb-1539-45ce-add2-877721083273',
          },
        ],
        createdAt: '2023-05-11T19:18:31.308Z',
        price: 8,
        category: {
          id: 1,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11818 Madge Plains, Brooklyn, NY 11408',
      coordinate: ['40.87137627086789', '-73.82540471916013'],
    },
    store: {
      id: 17,
      title: 'Ziemann Squares',
      email: 'Lolita62@yahoo.com',
      gsm: '(851) 932-9341',
      isActive: true,
      createdAt: '2023-06-12T05:42:11.354Z',
      address: {
        text: '11877 Emie Points, Massapequa, NY 11175',
        coordinate: ['40.77277182176422', '-73.9368724462396'],
      },
      products: [],
    },
    courier: {
      id: 8,
      name: 'Jena Altenwerth',
      email: 'Laurel.Russel@hotmail.com',
      gender: 'Male',
      gsm: '(700) 692-6967',
      createdAt: '2024-01-15T06:10:36.567Z',
      accountNumber: 7005981800,
      licensePlate: 'TJX 991',
      address: '11528 Willms Route, Massapequa, NY 11130',
      store: {
        id: 11,
        title: 'Evans Springs',
        email: 'Odessa_OReilly48@yahoo.com',
        gsm: '(177) 318-7407',
        isActive: true,
        createdAt: '2023-08-08T02:50:14.190Z',
        address: {
          text: '11667 Krajcik Mount, Lindenhurst, NY 11008',
          coordinate: ['40.71342338609038', '-73.97928399700366'],
        },
        products: [],
      },
      status: {
        id: 3,
        text: 'On delivery',
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
          name: '19f40134-3726-4143-8214-273a50d37604',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '6a0f7a30-fa47-4afc-947f-3006abff9135',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1241.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T11:20:41.517Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 455314,
  },
  {
    id: 143,
    user: {
      id: 248,
      firstName: 'Archibald',
      lastName: 'Kulas',
      fullName: 'Archibald Kulas',
      gender: 'Female',
      gsm: '(445) 738-5648',
      createdAt: '2024-04-05T10:16:15.628Z',
      isActive: true,
      avatar: [
        {
          name: 'a0584783-114c-4ffb-8d16-065b88dbe7c2',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '9b414695-139f-4287-89ec-fa820d4b1677',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/908.jpg',
        },
      ],
      addresses: [
        {
          text: '11643 Josiah Mission, Brooklyn, NY 11165',
          coordinate: ['40.765414561162565', '-73.97728109482736'],
        },
        {
          text: '11087 Carmine Unions, Lindenhurst, NY 11775',
          coordinate: ['40.70143658640243', '-73.78318383164519'],
        },
        {
          text: '11973 Stanton Lodge, Brooklyn, NY 11701',
          coordinate: ['40.68980199491192', '-73.76327553915705'],
        },
      ],
    },
    amount: 8.5,
    createdAt: '2024-04-16T07:59:57.610Z',
    products: [
      {
        id: 1,
        name: 'Tiramisu',
        isActive: true,
        description:
          'Layered Italian dessert made with ladyfingers, coffee, mascarpone cheese, and dusted with cocoa powder.',
        images: [
          {
            uid: '2105e5dc-1259-4549-b700-bff53de03cc5',
            type: 'image/jpg',
            name: 'Tiramisu',
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tiramisu.jpg',
          },
        ],
        createdAt: '2023-07-10T13:05:13.477Z',
        price: 28.5,
        category: {
          id: 5,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11643 Josiah Mission, Brooklyn, NY 11165',
      coordinate: ['40.765414561162565', '-73.97728109482736'],
    },
    store: {
      id: 8,
      title: 'Carroll Extension',
      email: 'Blake.Hilpert@yahoo.com',
      gsm: '(570) 511-2305',
      isActive: false,
      createdAt: '2023-06-06T12:08:29.933Z',
      address: {
        text: '11973 Roberts Lights, Lindenhurst, NY 11022',
        coordinate: ['40.61053754954674', '-74.02849518721247'],
      },
      products: [],
    },
    courier: {
      id: 60,
      name: 'Bill Dickens',
      email: 'Lisette_Ondricka84@gmail.com',
      gender: 'Female',
      gsm: '(725) 925-3120',
      createdAt: '2023-12-10T02:24:28.579Z',
      accountNumber: 7196043655,
      licensePlate: 'MZG 665',
      address: '11744 Noe Place, Lindenhurst, NY 11242',
      store: {
        id: 5,
        title: 'Glover Camp',
        email: 'Elva_King@hotmail.com',
        gsm: '(858) 740-0735',
        isActive: false,
        createdAt: '2024-02-03T06:23:14.892Z',
        address: {
          text: '11252 Miller Road, Brooklyn, NY 11457',
          coordinate: ['40.720073483768886', '-73.94523063805948'],
        },
        products: [],
      },
      status: {
        id: 2,
        text: 'Offline',
      },
      vehicle: {
        model: 'Kymco Like 125',
        vehicleType: 'Scooter',
        engineSize: 125,
        color: 'White',
        year: 2021,
        id: 9,
      },
      avatar: [
        {
          name: 'ce97e8d2-9e6d-412a-8164-8f289ef310f0',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'eea438bb-7a61-41bc-a693-bb02e2488ece',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1021.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T07:59:57.610Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 810985,
  },
  {
    id: 474,
    user: {
      id: 376,
      firstName: 'Werner',
      lastName: 'Herzog',
      fullName: 'Werner Herzog',
      gender: 'Male',
      gsm: '(430) 678-4071',
      createdAt: '2024-03-24T12:33:52.011Z',
      isActive: true,
      avatar: [
        {
          name: 'e29407eb-fc13-4cdb-8181-7b2657a02023',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'd084e31b-bce7-49a2-aa3f-30619916c9bc',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/2.jpg',
        },
      ],
      addresses: [
        {
          text: '11179 Schneider Curve, Lindenhurst, NY 11893',
          coordinate: ['40.68864889374978', '-73.92011672748508'],
        },
        {
          text: '11287 Keven Drives, Brooklyn, NY 11934',
          coordinate: ['40.782387059293', '-73.90060464423915'],
        },
        {
          text: '11657 Skiles Extension, Brooklyn, NY 11616',
          coordinate: ['40.58540403938158', '-74.04134796096665'],
        },
      ],
    },
    amount: 15.5,
    createdAt: '2024-04-16T03:50:23.187Z',
    products: [
      {
        id: 6,
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
            uid: '84b8853c-6242-4363-b6c5-faad168409e0',
          },
        ],
        createdAt: '2023-12-08T23:53:41.797Z',
        price: 5,
        category: {
          id: 1,
        },
      },
      {
        id: 76,
        name: 'Mushroom Swiss Burger',
        isActive: false,
        description: 'A beef patty topped with sautéed mushrooms and Swiss cheese. A rich and savory option.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-4.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-4-thumbnail.jpg',
            name: 'Mushroom Swiss Burger',
            status: 'done',
            type: 'image/jpg',
            uid: '547610c7-ced8-4c02-9375-1f413900afc2',
          },
        ],
        createdAt: '2023-11-07T07:57:57.132Z',
        price: 10.5,
        category: {
          id: 4,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11657 Skiles Extension, Brooklyn, NY 11616',
      coordinate: ['40.58540403938158', '-74.04134796096665'],
    },
    store: {
      id: 19,
      title: 'Hilbert Trail',
      email: 'Rashawn.Lindgren75@gmail.com',
      gsm: '(097) 817-8681',
      isActive: false,
      createdAt: '2024-04-06T12:36:20.347Z',
      address: {
        text: '11668 Pauline Pines, Massapequa, NY 11526',
        coordinate: ['40.65420401847953', '-73.88993977136992'],
      },
      products: [],
    },
    courier: {
      id: 66,
      name: 'Zita Glover',
      email: 'Madonna36@gmail.com',
      gender: 'Female',
      gsm: '(301) 105-9239',
      createdAt: '2024-02-13T23:25:54.621Z',
      accountNumber: 5498489620,
      licensePlate: 'WAN 275',
      address: '11098 Sibyl Viaduct, Brooklyn, NY 11765',
      store: {
        id: 4,
        title: 'Johns Neck',
        email: 'Connie.Brekke@gmail.com',
        gsm: '(865) 408-1948',
        isActive: false,
        createdAt: '2023-10-25T11:50:07.343Z',
        address: {
          text: '11476 Henderson Route, Massapequa, NY 11999',
          coordinate: ['40.63612786640798', '-74.02680078700389'],
        },
        products: [],
      },
      status: {
        id: 3,
        text: 'On delivery',
      },
      vehicle: {
        model: 'BMW F 850 GS Adventure',
        vehicleType: 'Motorcycle',
        engineSize: 853,
        color: 'White',
        year: 2020,
        id: 5,
      },
      avatar: [
        {
          name: 'b8746862-7c0e-4bbe-b255-a0447fa0174d',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '3bec6e1a-753d-46bf-a3e8-04d8405cc0b2',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/257.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T03:50:23.187Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 571756,
  },
  {
    id: 302,
    user: {
      id: 254,
      firstName: 'Sage',
      lastName: 'Hand',
      fullName: 'Sage Hand',
      gender: 'Male',
      gsm: '(855) 014-7209',
      createdAt: '2024-03-20T04:42:19.335Z',
      isActive: true,
      avatar: [
        {
          name: '6c64985e-8eb3-4c13-a45b-22bcdac7b663',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '23f1acb4-27b5-4608-9e43-aaa5324c50a9',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1135.jpg',
        },
      ],
      addresses: [
        {
          text: '11336 Zoey Estates, Massapequa, NY 11316',
          coordinate: ['40.69806241088623', '-73.99065926423829'],
        },
        {
          text: '11685 Pollich Locks, Lindenhurst, NY 11086',
          coordinate: ['40.744112865596875', '-73.84944935086574'],
        },
        {
          text: '11373 Beahan Spur, Brooklyn, NY 11287',
          coordinate: ['40.784032950710795', '-73.95917872710076'],
        },
      ],
    },
    amount: 39.5,
    createdAt: '2024-04-16T01:45:35.258Z',
    products: [
      {
        id: 10,
        name: 'Fried Pickles',
        isActive: false,
        description: 'Dill pickle slices battered and fried until golden brown. Served with a creamy ranch dressing.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pickles.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pickles-thumbnail.jpg',
            name: 'Fried Pickles',
            status: 'done',
            type: 'image/jpg',
            uid: 'a5bc701f-5ef2-4737-854d-e040267ad971',
          },
        ],
        createdAt: '2023-12-10T04:14:31.379Z',
        price: 7.5,
        category: {
          id: 1,
        },
      },
      {
        id: 27,
        name: 'Chicken Parmesan',
        isActive: true,
        description: 'Breaded chicken breast topped with marinara sauce and melted Parmesan and mozzarella cheese.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/chicken-parmesan.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/chicken-parmesan-thumbnail.jpg',
            name: 'Chicken Parmesan',
            status: 'done',
            type: 'image/jpg',
            uid: '6083c30b-ee23-4364-9261-e0a954102240',
          },
        ],
        createdAt: '2023-11-26T15:22:43.290Z',
        price: 15,
        category: {
          id: 8,
        },
      },
      {
        id: 35,
        name: 'Shrimp',
        isActive: false,
        description:
          'Skewered and grilled shrimp, seasoned with garlic and herbs, served with a side of cocktail sauce.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/shrimp.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/shrimp-thumbnail.jpg',
            name: 'Shrimp',
            status: 'done',
            type: 'image/jpg',
            uid: '2a4b3463-50e3-495d-83ac-1c5a61f365c4',
          },
        ],
        createdAt: '2023-07-21T07:14:55.000Z',
        price: 17,
        category: {
          id: 7,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11336 Zoey Estates, Massapequa, NY 11316',
      coordinate: ['40.69806241088623', '-73.99065926423829'],
    },
    store: {
      id: 11,
      title: 'Evans Springs',
      email: 'Odessa_OReilly48@yahoo.com',
      gsm: '(177) 318-7407',
      isActive: true,
      createdAt: '2023-08-08T02:50:14.190Z',
      address: {
        text: '11667 Krajcik Mount, Lindenhurst, NY 11008',
        coordinate: ['40.71342338609038', '-73.97928399700366'],
      },
      products: [],
    },
    courier: {
      id: 36,
      name: 'Clement Torphy',
      email: 'Kenyatta_Dach@yahoo.com',
      gender: 'Male',
      gsm: '(341) 262-0301',
      createdAt: '2023-05-28T01:16:34.308Z',
      accountNumber: 9824447456,
      licensePlate: 'COU 636',
      address: '11309 Enola Mill, Brooklyn, NY 11174',
      store: {
        id: 12,
        title: 'Konopelski Haven',
        email: 'Johnpaul_Jakubowski67@hotmail.com',
        gsm: '(353) 845-1027',
        isActive: true,
        createdAt: '2024-02-15T21:56:48.300Z',
        address: {
          text: '11336 Macy Cliff, Brooklyn, NY 11461',
          coordinate: ['40.58000068098125', '-73.83298267033166'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
      },
      vehicle: {
        model: 'Kawasaki Ninja 400',
        vehicleType: 'Motorcycle',
        engineSize: 392,
        color: 'Green',
        year: 2022,
        id: 3,
      },
      avatar: [
        {
          name: '24999589-1f2f-4ed1-afbe-54ba0e1169fb',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'b5dfebd6-7b5c-4902-9591-083851732033',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/666.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-16T01:45:35.258Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 266493,
  },
  {
    id: 556,
    user: {
      id: 470,
      firstName: 'Marquis',
      lastName: 'Leuschke',
      fullName: 'Marquis Leuschke',
      gender: 'Female',
      gsm: '(899) 054-7904',
      createdAt: '2024-03-19T23:33:54.952Z',
      isActive: false,
      avatar: [
        {
          name: '3f96ec56-0b8c-49b0-9def-50eb621b4388',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '36024151-39b8-4454-88b2-d6d349655403',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/693.jpg',
        },
      ],
      addresses: [
        {
          text: '11876 Kihn Shoal, Massapequa, NY 11692',
          coordinate: ['40.62038619725232', '-74.16432375351518'],
        },
        {
          text: '11533 Alanis Shoals, Massapequa, NY 11244',
          coordinate: ['40.863290617179665', '-73.82515376609743'],
        },
        {
          text: '11050 Gutmann Rue, Lindenhurst, NY 11448',
          coordinate: ['40.62900379007517', '-73.96208283008812'],
        },
      ],
    },
    amount: 3.5,
    createdAt: '2024-04-15T23:50:00.933Z',
    products: [
      {
        id: 19,
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
            uid: '98c1bec2-bf90-42af-8894-9aeeae0a5808',
          },
        ],
        createdAt: '2023-11-30T21:21:50.772Z',
        price: 3.5,
        category: {
          id: 10,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11050 Gutmann Rue, Lindenhurst, NY 11448',
      coordinate: ['40.62900379007517', '-73.96208283008812'],
    },
    store: {
      id: 3,
      title: 'Boehm Divide',
      email: 'Rey1@yahoo.com',
      gsm: '(552) 785-7262',
      isActive: true,
      createdAt: '2024-01-10T04:59:06.740Z',
      address: {
        text: '11952 Ana Lane, Brooklyn, NY 11018',
        coordinate: ['40.6975255512802', '-73.94051466309423'],
      },
      products: [],
    },
    courier: {
      id: 25,
      name: 'Oran Lang',
      email: 'Lilyan.Yundt@yahoo.com',
      gender: 'Male',
      gsm: '(237) 051-7886',
      createdAt: '2023-06-09T05:52:19.630Z',
      accountNumber: 2663174178,
      licensePlate: 'EGE 473',
      address: '11663 Remington Crest, Lindenhurst, NY 11890',
      store: {
        id: 5,
        title: 'Glover Camp',
        email: 'Elva_King@hotmail.com',
        gsm: '(858) 740-0735',
        isActive: false,
        createdAt: '2024-02-03T06:23:14.892Z',
        address: {
          text: '11252 Miller Road, Brooklyn, NY 11457',
          coordinate: ['40.720073483768886', '-73.94523063805948'],
        },
        products: [],
      },
      status: {
        id: 2,
        text: 'Offline',
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
          name: '7857691f-5754-44d9-85f1-bd5b31359894',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'b8dfcdee-e02b-46c6-8fcf-6693c0f5f60d',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/262.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T23:50:00.933Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 162015,
  },
  {
    id: 1192,
    user: {
      id: 523,
      firstName: 'Buster',
      lastName: 'Brown',
      fullName: 'Buster Brown',
      gender: 'Male',
      gsm: '(527) 046-9951',
      createdAt: '2024-03-23T22:00:24.268Z',
      isActive: false,
      avatar: [
        {
          name: '2576731b-50a0-4f36-89a8-933d6c0f2052',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '759e8935-5dfa-45a3-9f6c-10f81e08d877',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/919.jpg',
        },
      ],
      addresses: [
        {
          text: '11798 Gusikowski Lock, Massapequa, NY 11108',
          coordinate: ['40.666487360482265', '-73.86250656421268'],
        },
        {
          text: '11288 Marlin Summit, Lindenhurst, NY 11645',
          coordinate: ['40.7131797455106', '-74.01549881691386'],
        },
        {
          text: '11913 Labadie Hills, Brooklyn, NY 11546',
          coordinate: ['40.6548045329214', '-73.7390413385993'],
        },
      ],
    },
    amount: 32,
    createdAt: '2024-04-15T23:24:22.854Z',
    products: [
      {
        id: 24,
        name: 'Tortellini',
        isActive: true,
        description: 'Ring-shaped pasta filled with cheese or meat, served in broth or with a sauce.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-8.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-8-thumbnail.jpg',
            name: 'Tortellini',
            status: 'done',
            type: 'image/jpg',
            uid: '50ba2e2f-d748-4245-931a-94bdd21bd285',
          },
        ],
        createdAt: '2023-06-01T15:40:04.354Z',
        price: 13.5,
        category: {
          id: 2,
        },
      },
      {
        id: 56,
        name: 'Meat Lovers Pizza',
        isActive: true,
        description: 'A hearty  pizza topped with pepperoni, sausage, bacon, and ham.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/meat-pizza.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/meat-pizza-thumbnail.jpg',
            name: 'Meat Lovers Pizza',
            status: 'done',
            type: 'image/jpg',
            uid: '3278ed4d-7d7b-4022-81ff-af76adb9a68f',
          },
        ],
        createdAt: '2024-01-22T03:12:22.722Z',
        price: 16,
        category: {
          id: 3,
        },
      },
      {
        id: 65,
        name: 'Tea',
        isActive: false,
        description: 'A selection of herbal, black, and green teas.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tea.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/tea-thumbnail.jpg',
            name: 'Tea',
            status: 'done',
            type: 'image/jpg',
            uid: '6e5e4aaa-e735-4bdb-a194-d7ee10fa2132',
          },
        ],
        createdAt: '2023-07-31T19:43:28.226Z',
        price: 2.5,
        category: {
          id: 10,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11288 Marlin Summit, Lindenhurst, NY 11645',
      coordinate: ['40.7131797455106', '-74.01549881691386'],
    },
    store: {
      id: 11,
      title: 'Evans Springs',
      email: 'Odessa_OReilly48@yahoo.com',
      gsm: '(177) 318-7407',
      isActive: true,
      createdAt: '2023-08-08T02:50:14.190Z',
      address: {
        text: '11667 Krajcik Mount, Lindenhurst, NY 11008',
        coordinate: ['40.71342338609038', '-73.97928399700366'],
      },
      products: [],
    },
    courier: {
      id: 59,
      name: 'Ursula Wiza',
      email: 'Veronica79@gmail.com',
      gender: 'Male',
      gsm: '(837) 314-1748',
      createdAt: '2023-11-17T03:54:58.476Z',
      accountNumber: 2350803507,
      licensePlate: 'FGF 500',
      address: '11057 Abigale Crest, Lindenhurst, NY 11035',
      store: {
        id: 2,
        title: 'Julio Crossroad',
        email: 'Saige.Ullrich35@gmail.com',
        gsm: '(756) 531-3580',
        isActive: true,
        createdAt: '2023-06-03T02:16:42.273Z',
        address: {
          text: '11785 Mosciski Valley, Lindenhurst, NY 11016',
          coordinate: ['40.90414688530339', '-73.88225826650331'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
      },
      vehicle: {
        model: 'Piaggio MP3 500 HPE',
        vehicleType: 'Maxi-Scooter',
        engineSize: 493,
        color: 'Brown',
        year: 2021,
        id: 14,
      },
      avatar: [
        {
          name: 'a4e46b23-a48e-4ce9-b1b1-d6d97ba9e976',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'e3a7984b-e204-4bb9-9795-b1845eaeea94',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/811.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T23:24:22.854Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 154451,
  },
  {
    id: 1067,
    user: {
      id: 429,
      firstName: 'Brennon',
      lastName: 'Monahan',
      fullName: 'Brennon Monahan',
      gender: 'Male',
      gsm: '(822) 899-0998',
      createdAt: '2024-03-21T19:55:38.006Z',
      isActive: false,
      avatar: [
        {
          name: 'f562b991-3660-41ed-bfcc-4da654331d8a',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '0669ef7c-c68e-4257-afe2-347343a58fbc',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/763.jpg',
        },
      ],
      addresses: [
        {
          text: '11533 Alanis Shoals, Massapequa, NY 11244',
          coordinate: ['40.863290617179665', '-73.82515376609743'],
        },
        {
          text: '11597 Roberts Spur, Lindenhurst, NY 11275',
          coordinate: ['40.573038351064625', '-73.98324179369882'],
        },
        {
          text: '11564 Barrows Cliff, Lindenhurst, NY 11149',
          coordinate: ['40.621186197540396', '-73.80859405794375'],
        },
      ],
    },
    amount: 53,
    createdAt: '2024-04-15T20:08:42.197Z',
    products: [
      {
        id: 9,
        name: 'Turkey Burger',
        isActive: true,
        description:
          'A lean, seasoned turkey patty with avocado, lettuce, tomato, and onion. A lighter, yet flavorful choice.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-7.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/burger-7-thumbnail.jpg',
            name: 'Turkey Burger',
            status: 'done',
            type: 'image/jpg',
            uid: '5567b1f4-5065-48cf-8ddd-15895274ade3',
          },
        ],
        createdAt: '2024-04-12T08:41:27.587Z',
        price: 9.5,
        category: {
          id: 4,
        },
      },
      {
        id: 25,
        name: 'Penne Arrabbiata',
        isActive: true,
        description: 'Short tube-shaped pasta in a spicy tomato sauce with garlic, chili peppers, and parsley.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-3.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pasta-3-thumbnail.jpg',
            name: 'Penne Arrabbiata',
            status: 'done',
            type: 'image/jpg',
            uid: 'fe80d9b9-7dab-4e52-9f4e-9a3d81d795a0',
          },
        ],
        createdAt: '2023-07-12T11:39:13.410Z',
        price: 12,
        category: {
          id: 2,
        },
      },
      {
        id: 35,
        name: 'Shrimp',
        isActive: false,
        description:
          'Skewered and grilled shrimp, seasoned with garlic and herbs, served with a side of cocktail sauce.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/shrimp.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/shrimp-thumbnail.jpg',
            name: 'Shrimp',
            status: 'done',
            type: 'image/jpg',
            uid: '2a4b3463-50e3-495d-83ac-1c5a61f365c4',
          },
        ],
        createdAt: '2023-07-21T07:14:55.000Z',
        price: 17,
        category: {
          id: 7,
        },
      },
      {
        id: 53,
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
            uid: '20531f90-a38f-4cad-a373-b5a7253a3aac',
          },
        ],
        createdAt: '2023-09-21T13:07:06.585Z',
        price: 14.5,
        category: {
          id: 3,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11597 Roberts Spur, Lindenhurst, NY 11275',
      coordinate: ['40.573038351064625', '-73.98324179369882'],
    },
    store: {
      id: 19,
      title: 'Hilbert Trail',
      email: 'Rashawn.Lindgren75@gmail.com',
      gsm: '(097) 817-8681',
      isActive: false,
      createdAt: '2024-04-06T12:36:20.347Z',
      address: {
        text: '11668 Pauline Pines, Massapequa, NY 11526',
        coordinate: ['40.65420401847953', '-73.88993977136992'],
      },
      products: [],
    },
    courier: {
      id: 68,
      name: 'Josefina Spinka',
      email: 'Gia.Rau@hotmail.com',
      gender: 'Female',
      gsm: '(190) 435-5388',
      createdAt: '2024-02-16T18:52:00.333Z',
      accountNumber: 5693231203,
      licensePlate: 'BJX 849',
      address: '11420 Legros Land, Massapequa, NY 11377',
      store: {
        id: 19,
        title: 'Hilbert Trail',
        email: 'Rashawn.Lindgren75@gmail.com',
        gsm: '(097) 817-8681',
        isActive: false,
        createdAt: '2024-04-06T12:36:20.347Z',
        address: {
          text: '11668 Pauline Pines, Massapequa, NY 11526',
          coordinate: ['40.65420401847953', '-73.88993977136992'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
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
          name: '78f8b946-b488-4d82-80ff-2bde0a908bfc',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'eaa87cb5-6aae-402d-9b64-cf2acb7d09d6',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/127.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T20:08:42.197Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 288503,
  },
  {
    id: 1150,
    user: {
      id: 89,
      firstName: 'Rasheed',
      lastName: 'Greenfelder',
      fullName: 'Rasheed Greenfelder',
      gender: 'Female',
      gsm: '(064) 418-6690',
      createdAt: '2024-04-02T23:11:14.028Z',
      isActive: false,
      avatar: [
        {
          name: '3d5b5226-e76e-43e6-851b-41739594b702',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '77db4dbf-9ca3-44b3-930c-a9693238fb04',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/710.jpg',
        },
      ],
      addresses: [
        {
          text: '11179 Schneider Curve, Lindenhurst, NY 11893',
          coordinate: ['40.68864889374978', '-73.92011672748508'],
        },
        {
          text: '11640 Runolfsdottir Glens, Lindenhurst, NY 11657',
          coordinate: ['40.84905802022873', '-73.85211929222599'],
        },
        {
          text: '11946 Hillard Island, Massapequa, NY 11610',
          coordinate: ['40.843536463977905', '-73.90800894850724'],
        },
      ],
    },
    amount: 16,
    createdAt: '2024-04-15T18:54:11.764Z',
    products: [
      {
        id: 48,
        name: 'Pork',
        isActive: true,
        description: 'Grilled pork chops seasoned with a savory rub and served with apple compote.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pork.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pork-thumbnail.jpg',
            name: 'Pork',
            status: 'done',
            type: 'image/jpg',
            uid: 'be2cb2cd-5530-4387-949d-747777a0c624',
          },
        ],
        createdAt: '2024-01-06T00:00:19.631Z',
        price: 16,
        category: {
          id: 7,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11946 Hillard Island, Massapequa, NY 11610',
      coordinate: ['40.843536463977905', '-73.90800894850724'],
    },
    store: {
      id: 15,
      title: 'Kari Turnpike',
      email: 'Skye4@gmail.com',
      gsm: '(802) 948-7604',
      isActive: true,
      createdAt: '2024-04-05T02:54:48.152Z',
      address: {
        text: '11083 Trever Shore, Massapequa, NY 11630',
        coordinate: ['40.87599122761844', '-73.90010485129264'],
      },
      products: [],
    },
    courier: {
      id: 68,
      name: 'Josefina Spinka',
      email: 'Gia.Rau@hotmail.com',
      gender: 'Female',
      gsm: '(190) 435-5388',
      createdAt: '2024-02-16T18:52:00.333Z',
      accountNumber: 5693231203,
      licensePlate: 'BJX 849',
      address: '11420 Legros Land, Massapequa, NY 11377',
      store: {
        id: 19,
        title: 'Hilbert Trail',
        email: 'Rashawn.Lindgren75@gmail.com',
        gsm: '(097) 817-8681',
        isActive: false,
        createdAt: '2024-04-06T12:36:20.347Z',
        address: {
          text: '11668 Pauline Pines, Massapequa, NY 11526',
          coordinate: ['40.65420401847953', '-73.88993977136992'],
        },
        products: [],
      },
      status: {
        id: 1,
        text: 'Available',
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
          name: '78f8b946-b488-4d82-80ff-2bde0a908bfc',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'eaa87cb5-6aae-402d-9b64-cf2acb7d09d6',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/127.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T18:54:11.764Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 593432,
  },
  {
    id: 1148,
    user: {
      id: 547,
      firstName: 'Shanon',
      lastName: 'Senger',
      fullName: 'Shanon Senger',
      gender: 'Male',
      gsm: '(315) 250-3820',
      createdAt: '2024-04-09T21:49:38.852Z',
      isActive: false,
      avatar: [
        {
          name: 'c28343e9-f6c0-4723-814d-33fd682e20a1',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'dcda8335-7fb6-4d4f-a15c-724e5a7fa50f',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/884.jpg',
        },
      ],
      addresses: [
        {
          text: '11875 Keebler Mills, Massapequa, NY 11602',
          coordinate: ['40.626738204394904', '-74.07746582170483'],
        },
        {
          text: '11548 Leannon Skyway, Brooklyn, NY 11039',
          coordinate: ['40.6676201666728', '-73.96215385757148'],
        },
        {
          text: '11819 Chasity Locks, Brooklyn, NY 11027',
          coordinate: ['40.661863361815605', '-73.88170599464335'],
        },
      ],
    },
    amount: 38,
    createdAt: '2024-04-15T18:11:27.062Z',
    products: [
      {
        id: 26,
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
            uid: '9439e165-c8de-4cd5-9272-6fb9ce463958',
          },
        ],
        createdAt: '2024-04-09T09:46:23.995Z',
        price: 13,
        category: {
          id: 8,
        },
      },
      {
        id: 57,
        name: 'Spinach Artichoke Dip',
        isActive: false,
        description: 'A creamy blend of spinach, artichokes, and cheeses, served hot with tortilla chips for dipping.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/spinach.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/spinach-thumbnail.jpg',
            name: 'Spinach Artichoke Dip',
            status: 'done',
            type: 'image/jpg',
            uid: '2cfa38fe-31bc-4881-9615-b4993d8be65a',
          },
        ],
        createdAt: '2023-07-22T23:46:03.464Z',
        price: 10,
        category: {
          id: 1,
        },
      },
      {
        id: 67,
        name: 'Onion Rings',
        isActive: false,
        description:
          'Thick-cut onions dipped in batter and fried to a crispy golden brown. A crunchy and sweet appetizer.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/onion-ring.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/onion-ring-thumbnail.jpg',
            name: 'Onion Rings',
            status: 'done',
            type: 'image/jpg',
            uid: 'e79bcefb-1539-45ce-add2-877721083273',
          },
        ],
        createdAt: '2023-05-11T19:18:31.308Z',
        price: 8,
        category: {
          id: 1,
        },
      },
      {
        id: 74,
        name: 'Chocolate Cake',
        isActive: false,
        description: "Rich and moist chocolate layers with creamy chocolate frosting. Every chocolate lover's dream.",
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cake.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cake-thumbnail.jpg',
            name: 'Chocolate Cake',
            status: 'done',
            type: 'image/jpg',
            uid: 'c9fa5023-9c65-42d1-bf85-d561edcb024f',
          },
        ],
        createdAt: '2023-12-05T19:58:03.889Z',
        price: 7,
        category: {
          id: 5,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11819 Chasity Locks, Brooklyn, NY 11027',
      coordinate: ['40.661863361815605', '-73.88170599464335'],
    },
    store: {
      id: 17,
      title: 'Ziemann Squares',
      email: 'Lolita62@yahoo.com',
      gsm: '(851) 932-9341',
      isActive: true,
      createdAt: '2023-06-12T05:42:11.354Z',
      address: {
        text: '11877 Emie Points, Massapequa, NY 11175',
        coordinate: ['40.77277182176422', '-73.9368724462396'],
      },
      products: [],
    },
    courier: {
      id: 14,
      name: 'Declan Walsh',
      email: 'Geoffrey.Schuster22@gmail.com',
      gender: 'Male',
      gsm: '(018) 938-3158',
      createdAt: '2024-04-04T19:01:32.852Z',
      accountNumber: 6755623658,
      licensePlate: 'DTK 309',
      address: '11928 Block Ports, Lindenhurst, NY 11008',
      store: {
        id: 6,
        title: 'Charlie Parkways',
        email: 'Gabriella_Wunsch@gmail.com',
        gsm: '(235) 094-0209',
        isActive: true,
        createdAt: '2024-03-02T06:13:33.872Z',
        address: {
          text: '11322 Carter Manors, Lindenhurst, NY 11190',
          coordinate: ['40.73071438106362', '-74.00133728401143'],
        },
        products: [],
      },
      status: {
        id: 3,
        text: 'On delivery',
      },
      vehicle: {
        model: 'Super Soco TC Max',
        vehicleType: 'Electric Scooter',
        battery: '72V 45Ah',
        color: 'Red',
        year: 2022,
        id: 13,
      },
      avatar: [
        {
          name: '3b410348-b859-4f69-8b1f-b1628eb4d4b0',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'e010a784-9839-44cf-9863-52e47190fb95',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/953.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T18:11:27.062Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 512852,
  },
  {
    id: 627,
    user: {
      id: 324,
      firstName: 'Brendon',
      lastName: 'Sanford',
      fullName: 'Brendon Sanford',
      gender: 'Male',
      gsm: '(629) 339-7145',
      createdAt: '2024-03-29T09:07:52.326Z',
      isActive: true,
      avatar: [
        {
          name: 'd834d0d4-9c91-4aff-9357-40c35ee31ea8',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: '618eae38-0d35-4ea3-9a86-55740b792697',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/350.jpg',
        },
      ],
      addresses: [
        {
          text: '11391 Veum Crest, Lindenhurst, NY 11743',
          coordinate: ['40.777097807782305', '-73.97744997044656'],
        },
        {
          text: '11134 Bartell Throughway, Brooklyn, NY 11181',
          coordinate: ['40.6670743264734', '-73.95192429638435'],
        },
        {
          text: '11020 Cruickshank Center, Brooklyn, NY 11387',
          coordinate: ['40.58880019504151', '-74.16518043562895'],
        },
      ],
    },
    amount: 28.5,
    createdAt: '2024-04-15T13:36:50.060Z',
    products: [
      {
        id: 10,
        name: 'Fried Pickles',
        isActive: false,
        description: 'Dill pickle slices battered and fried until golden brown. Served with a creamy ranch dressing.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pickles.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pickles-thumbnail.jpg',
            name: 'Fried Pickles',
            status: 'done',
            type: 'image/jpg',
            uid: 'a5bc701f-5ef2-4737-854d-e040267ad971',
          },
        ],
        createdAt: '2023-12-10T04:14:31.379Z',
        price: 7.5,
        category: {
          id: 1,
        },
      },
      {
        id: 18,
        name: 'Pepperoni Pizza',
        isActive: true,
        description: 'A timeless favorite topped with zesty pepperoni and melted mozzarella cheese.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepperoni-pizza.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/pepperoni-pizza-thumbnail.jpg',
            name: 'Pepperoni Pizza',
            status: 'done',
            type: 'image/jpg',
            uid: '357af9f9-8afb-4253-80d8-a0e2d1fcc6cc',
          },
        ],
        createdAt: '2023-11-12T07:55:34.081Z',
        price: 13,
        category: {
          id: 3,
        },
      },
      {
        id: 30,
        name: 'Mozzarella Sticks',
        isActive: false,
        description: 'Crispy on the outside, gooey on the inside. Served with a robust marinara dipping sauce.',
        images: [
          {
            url: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cheese-sticks.jpg',
            thumbnailUrl: 'https://refine.ams3.cdn.digitaloceanspaces.com/finefoods/cheese-sticks-thumbnail.jpg',
            name: 'Mozzarella Sticks',
            status: 'done',
            type: 'image/jpg',
            uid: '4858ab93-42b6-41f5-ba2f-8e10becba664',
          },
        ],
        createdAt: '2024-02-05T00:07:56.040Z',
        price: 8,
        category: {
          id: 1,
        },
      },
    ],
    status: {
      id: 1,
      text: 'Pending',
    },
    adress: {
      text: '11391 Veum Crest, Lindenhurst, NY 11743',
      coordinate: ['40.777097807782305', '-73.97744997044656'],
    },
    store: {
      id: 4,
      title: 'Johns Neck',
      email: 'Connie.Brekke@gmail.com',
      gsm: '(865) 408-1948',
      isActive: false,
      createdAt: '2023-10-25T11:50:07.343Z',
      address: {
        text: '11476 Henderson Route, Massapequa, NY 11999',
        coordinate: ['40.63612786640798', '-74.02680078700389'],
      },
      products: [],
    },
    courier: {
      id: 21,
      name: 'Jordan White',
      email: 'Montana_Pfannerstill@gmail.com',
      gender: 'Male',
      gsm: '(660) 992-4652',
      createdAt: '2023-08-13T00:45:23.539Z',
      accountNumber: 1468745843,
      licensePlate: 'SLY 797',
      address: '11651 Lindgren Trafficway, Massapequa, NY 11181',
      store: {
        id: 18,
        title: 'Jacobi Prairie',
        email: 'Jaylin.Walsh4@hotmail.com',
        gsm: '(716) 329-5511',
        isActive: true,
        createdAt: '2023-07-31T08:21:23.532Z',
        address: {
          text: '11630 Ida Track, Lindenhurst, NY 11494',
          coordinate: ['40.62793710077878', '-73.99943486015856'],
        },
        products: [],
      },
      status: {
        id: 3,
        text: 'On delivery',
      },
      vehicle: {
        model: 'Vespa Primavera 150',
        vehicleType: 'Scooter',
        engineSize: 150,
        color: 'Yellow',
        year: 2023,
        id: 6,
      },
      avatar: [
        {
          name: '6b8af91e-d528-49f5-a818-a768cc26d072',
          percent: 100,
          size: 40088,
          status: 'done',
          type: 'image/jpeg',
          uid: 'c6baf739-501d-4428-b7ca-9a3fade5d046',
          url: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1173.jpg',
        },
      ],
    },
    events: [
      {
        date: '2024-04-15T13:36:50.060Z',
        status: 'Pending',
      },
      {
        status: 'Ready',
      },
      {
        status: 'On The Way',
      },
      {
        status: 'Delivered',
      },
    ],
    orderNumber: 573093,
  },
];

const mockorderTimeLine = [
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

export const withDashboardController = <P,>(Component: ComponentType<P>): ComponentType<P> => {
  return (props: P) => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const defaultValue: CustomResponse<{
      data: ISalesChart[];
      total: number;
      trend: number;
    }> = {
      data: {
        data: [{ date: '', value: 0 }],
        total: 0,
        trend: 0,
      },
    };

    const LogicProps: DashboardProps = {
      data: {
        isLoading,
        dailyRevenueData: { data: mockData1 as any },
        dailyOrdersData: { data: mockData2 as any },
        newCustomersData: { data: mockData3 as any },
        orders: mockorderTimeLine as any,
      },
      dispatch: {},
    };

    return <Component {...props} {...LogicProps} />;
  };
};
