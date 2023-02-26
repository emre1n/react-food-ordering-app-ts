import React from 'react';
import mealsImage from '../../../assets/meals.jpeg';
import styles from './styles.module.css';

import HeaderCartButton from '../HeaderCartButton';

type TProps = {
  onShowCart: () => void;
};

const Header = ({ onShowCart }: TProps) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
