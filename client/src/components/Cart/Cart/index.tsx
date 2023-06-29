import React, { useContext } from 'react';
import Modal from '../../UI/Modal';
import CartItem from '../CartItem';
import ICartItem from '../../../libs/models/cartItem.model';

import styles from './styles.module.css';
import CartContext from '../../../store/cart-context';

type TProps = {
  onClose: () => void;
};

const Cart = ({ onClose }: TProps) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item: ICartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (item: ICartItem) => {
    cartCtx.removeItem(item);
  };

  const cartItems = (
    <ul className={styles['cart-items']}>
      {cartCtx.items.map(item => (
        <CartItem
          item={item}
          key={item.id}
          id={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  return (
    <Modal onClose={onClose}>
      <>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
          <button className={styles['button--alt']} onClick={onClose}>
            Close
          </button>
          {hasItems && <button className={styles.button}>Order</button>}
        </div>
      </>
    </Modal>
  );
};

export default Cart;
