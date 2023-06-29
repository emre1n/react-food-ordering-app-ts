import React, { useContext } from 'react';

import MealItemForm from './MealItemForm';
import IMeals from '../../../libs/models/meals.model';
import styles from './styles.module.css';

import CartContext from '../../../store/cart-context';

const MealItem = ({ name, description, price, id }: IMeals) => {
  const cartCtx = useContext(CartContext);
  const priceFormatted = `$${price.toFixed(2)}`;

  const addToCartHandler = (amount: number) => {
    cartCtx.addItem({
      id,
      name,
      amount,
      price,
    });
  };

  return (
    <li key={id} className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.price}>{priceFormatted}</div>
      </div>
      <div>
        <MealItemForm mealId={id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
