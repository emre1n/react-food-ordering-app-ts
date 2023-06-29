// to initialize the db use `npx prisma db seed` command

import { db } from '../src/utils/db.server';

interface Meal {
  id: number;
  name: string;
  description: string;
  price: number;
}

interface CartItem {
  id: number;
  name: string;
  amount: number;
  price: number;
}

const seed = async () => {
  await Promise.all(
    getMeals().map(meal => {
      return db.meal.create({
        data: {
          id: meal.id,
          name: meal.name,
          description: meal.description,
          price: meal.price,
        },
      });
    })
  );
};

const getMeals = (): Array<Meal> => {
  return [
    {
      id: 1,
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 2,
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 3,
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 4,
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];
};
