import { useContext, useState } from 'react';
import Modal from '../../UI/Modal';
import CartItem from '../CartItem';
import ICartItem from '../../../libs/models/cartItem.model';
import Checkout from '../Checkout';

import styles from './styles.module.css';
import CartContext from '../../../store/cart-context';

import generateCartSummary from '../../../libs/helpers/generateCartSummary';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

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

  const submitOrderHandler = async (userData: TUserData) => {
    setIsSubmitting(true);

    const cartSummary = generateCartSummary(cartCtx.items);
    const currentDate = new Date();

    await fetch('http://localhost:5000/api/orders', {
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
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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

  const cartModalContent = (
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
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <>
      <p>Successfully sent the order!</p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );

  return (
    <Modal onClose={onClose}>
      <>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && isSubmittingModalContent}
        {!isSubmitting && didSubmit && didSubmitModalContent}
      </>
    </Modal>
  );
};

export default Cart;
