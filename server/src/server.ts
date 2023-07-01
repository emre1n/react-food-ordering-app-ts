import * as dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { mealRouter } from './meals/author.router';
import { orderRouter } from './order/order.router';

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/meals', mealRouter);
app.use('/api/orders', orderRouter);

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
