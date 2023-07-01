import { useContext, useState } from 'react';
import Modal from '../../UI/Modal';
import CartItem from '../CartItem';
import ICartItem from '../../../libs/models/cartItem.model';
import Checkout from '../Checkout';

import styles from './styles.module.css';
import CartContext from '../../../store/cart-context';

type TUserData = {
  name: string;
  street: string;
  city: string;
  postalCode: string;
};

type TProps = {
  onClose: () => void;
};

const Cart = ({ onClose }: TProps) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item: ICartItem) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (item: ICartItem) => {
    cartCtx.removeItem(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = (userData: TUserData) => {
    const generateCartSummary = (
      cartItems: ICartItem[]
    ): { summary: string; cartTotal: string } => {
      let grandTotal = 0;

      const summary = cartItems
        .map(item => {
          const itemTotal = item.amount * item.price;
          grandTotal += itemTotal;
          return `${item.amount} x ${item.name} - ${itemTotal}`;
        })
        .join(', ');

      return {
        summary: `${summary}, Total: USD ${grandTotal}`,
        cartTotal: `${grandTotal}`,
      };
    };

    const cartSummary = generateCartSummary(cartCtx.items);
    const currentDate = new Date();

    fetch('http://localhost:5000/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Added Content-Type header
      },
      body: JSON.stringify({
        name: userData.name,
        street: userData.street,
        city: userData.city,
        postalCode: userData.postalCode,
        cartSummary: cartSummary.summary,
        cartTotal: cartSummary.cartTotal,
        orderDate: currentDate.toISOString(),
      }),
    });
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

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={onClose}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onClose={onClose}>
      <>
        {cartItems}
        <div className={styles.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
        {isCheckout && (
          <Checkout onConfirm={submitOrderHandler} onCancel={onClose} />
        )}
        {!isCheckout && modalActions}
      </>
    </Modal>
  );
};

export default Cart;
