import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as OrderService from './order.service';

export const orderRouter = express.Router();

// GET: List all the orders
orderRouter.get('/', async (request: Request, response: Response) => {
  try {
    const orders = await OrderService.listOrders();
    return response.status(200).json(orders);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: An order based on the id
orderRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);

  try {
    const order = await OrderService.getOrder(id);
    if (order) {
      return response.status(200).json(order);
    }
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create an order
orderRouter.post(
  '/',
  body('name').isString(),
  body('street').isString(),
  body('city').isString(),
  body('postalCode').isString(),
  body('cardSummary').isString(),
  body('cartTotal').isFloat(),
  body('orderDate').isDate().toDate(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const order = request.body;
      const newOrder = await OrderService.createOrder(order);
      return response.status(201).json(newOrder);
    } catch (error: any) {
      response.status(500).json(error.message);
    }
  }
);

// PUT: Update an Order
// Params: name, street, city, postalCode, cartSummary, cartTotal, orderDate
orderRouter.put(
  '/:id',
  body('name').isString(),
  body('street').isString(),
  body('city').isString(),
  body('postalCode').isString(),
  body('cardSummary').isString(),
  body('cartTotal').isFloat(),
  body('orderDate').isDate().toDate(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const order = request.body;
      const updatedOrder = await OrderService.updateOrder(order, id);
      return response.status(201).json(updatedOrder);
    } catch (error: any) {
      response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete an order based on the id
orderRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await OrderService.deleteOrder(id);
    return response.status(204).json('Order was successfully deleted');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
