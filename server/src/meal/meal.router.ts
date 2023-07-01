import express from 'express';
import type { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import * as MealService from './meal.service';

export const mealRouter = express.Router();

type Meal = {
  id: number;
  name: string;
  description: string;
  price: number;
};

// GET: List of all Meals
mealRouter.get('/', async (request: Request, response: Response) => {
  try {
    const meals = await MealService.listMeals();
    return response.status(200).json(meals);
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// GET: A single meal by ID
mealRouter.get('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    const meal = await MealService.getMeal(id);
    if (meal) {
      return response.status(200).json(meal);
    }
    return response.status(404).json('Meal could not be found');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});

// POST: Create a Meal
// Params: name, description, price
mealRouter.post(
  '/',
  body('name').isString(),
  body('description').isString(),
  body('price').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const meal: any = request.body;
      const mealWithNumberPrice = { ...meal, price: parseFloat(meal.price) };
      const newMeal = await MealService.createMeal(mealWithNumberPrice);
      return response.status(201).json(newMeal);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update a Meal
// Params: name, description, price
mealRouter.put(
  '/:id',
  body('name').isString(),
  body('description').isString(),
  body('price').isString(),
  async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id: number = parseInt(request.params.id, 10);
    try {
      const meal = request.body;
      const mealWithNumberPrice = { ...meal, price: parseFloat(meal.price) };
      const updatedMeal = await MealService.updateMeal(mealWithNumberPrice, id);
      return response.status(200).json(updatedMeal);
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
);

// DELETE: Delete a meal based on the id
mealRouter.delete('/:id', async (request: Request, response: Response) => {
  const id: number = parseInt(request.params.id, 10);
  try {
    await MealService.deleteMeal(id);
    return response.status(204).json('Meal has been successfully deleted');
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
});
