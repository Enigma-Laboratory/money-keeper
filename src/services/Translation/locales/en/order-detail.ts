import { OrderStatus } from '@enigma-laboratory/shared';
const { CANCELLED, CONFIRM, DONE, PROCESSING } = OrderStatus;

export default {
  information: {
    name: 'Name',
    buyer: 'Buyer',
    status: 'Status',
    groupName: 'Group Name',
    description: 'Description',
    createdOrderAt: 'Created Order At: ',
  },
  product: {
    name: 'Product name',
    userIds: 'useIds',
    price: 'Price',
    total: 'Total',
  },
  
  orderEvenLog: 'Order event log',
  btn: {
    update: 'Update',
    delete: 'Delete',
  },
  orderDetails: 'Order Details',
  eventLogs: {
    [PROCESSING]: {
      title: 'created an order.',
      description: 'The order is currently being processed.',
    },
    [CONFIRM]: {
      title: 'changed the status to confirm.',
      description: 'The order has been confirmed and is now awaiting fulfillment.',
    },
    [DONE]: {
      title: 'changed the status to done.',
      description: 'The order has been successfully completed.',
    },
    [CANCELLED]: {
      title: 'cancelled the order.',
      description: 'The order is now closed and can no longer be modified.',
    },
  },
};
