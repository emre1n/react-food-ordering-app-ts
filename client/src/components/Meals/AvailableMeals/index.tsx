import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

import Card from '../../UI/Card';
import MealItem from '../MealItem';
import IMeals from '../../../libs/models/meals.model';

const AvailableMeals = () => {
  const [meals, setMeals] = useState<IMeals[]>([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('/api/meals');
      const responseData = await response.json();
      setMeals(responseData);
    };

    fetchMeals();
  }, []);

  const mealsList = meals.map(meal => (
    <MealItem
      id={meal.id.toString()}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
