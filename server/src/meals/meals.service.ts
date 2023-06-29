import { db } from '../utils/db.server';

type Meal = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const listMeals = async (): Promise<Meal[]> => {
  return db.meal.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  });
};

export const getMeal = async (id: number): Promise<Meal | null> => {
  return db.meal.findUnique({
    where: {
      id,
    },
  });
};

export const createMeal = async (meal: Omit<Meal, 'id'>): Promise<Meal> => {
  const { name, description, price } = meal;
  return db.meal.create({
    data: {
      name,
      description,
      price,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  });
};

export const updateMeal = async (
  meal: Omit<Meal, 'id'>,
  id: number
): Promise<Meal> => {
  const { name, description, price } = meal;
  return db.meal.update({
    where: {
      id,
    },
    data: {
      name,
      description,
      price,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
    },
  });
};

export const deleteMeal = async (id: number): Promise<void> => {
  await db.meal.delete({
    where: {
      id,
    },
  });
};
