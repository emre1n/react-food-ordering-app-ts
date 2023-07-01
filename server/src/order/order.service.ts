import { db } from '../utils/db.server';

type OrderRead = {
  id: number;
  name: string;
  street: string;
  city: string;
  postalCode: string;
  cartSummary: string;
  cartTotal: number;
  orderDate: Date;
};

type OrderWrite = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
  cartSummary: string;
  cartTotal: string;
  orderDate: Date;
};

export const listOrders = async (): Promise<OrderRead[]> => {
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

export const getOrder = async (id: number): Promise<OrderRead | null> => {
  return db.order.findUnique({
    where: {
      id,
    },
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

export const createOrder = async (order: OrderWrite): Promise<OrderRead> => {
  const { name, street, city, postalCode, cartSummary, cartTotal, orderDate } =
    order;
  const parsedDate: Date = new Date(orderDate);
  const parsedCartTotal = parseFloat(cartTotal);
  return db.order.create({
    data: {
      name,
      street,
      city,
      postalCode,
      cartSummary,
      cartTotal: parsedCartTotal,
      orderDate: parsedDate,
    },
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

export const updateOrder = async (
  order: OrderWrite,
  id: number
): Promise<OrderRead> => {
  const { name, street, city, postalCode, cartSummary, cartTotal, orderDate } =
    order;
  const parsedCartTotal = parseFloat(cartTotal);
  return db.order.update({
    where: {
      id,
    },
    data: {
      name,
      street,
      city,
      postalCode,
      cartSummary,
      cartTotal: parsedCartTotal,
      orderDate,
    },
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

export const deleteOrder = async (id: number): Promise<void> => {
  await db.order.delete({
    where: {
      id,
    },
  });
};
