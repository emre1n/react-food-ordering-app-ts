import React from 'react';

import styles from './styles.module.css';

type TCardContentProps = {
  children: JSX.Element;
};

const Card = ({ children }: TCardContentProps) => {
  return <div className={styles.card}>{children}</div>;
};

export default Card;
