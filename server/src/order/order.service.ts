import { db } from '../utils/db.server';

type Order = {
  id: number;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  cartSummary: string;
  cartTotal: number;
  orderDate: Date;
};

export const listOrders = async (): Promise<Order[]> => {
  return db.order.findMany({
    select: {
      id: true,
      name: true,
      street: true,
      city: true,
      postalCode: true,
      cartSummary: true,
      cartTotal: true,
      orderDate: true,
    },
  });
};
