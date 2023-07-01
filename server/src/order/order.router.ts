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
