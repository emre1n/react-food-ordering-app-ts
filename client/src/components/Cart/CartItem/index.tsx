import styles from './styles.module.css';
import ICartItem from '../../../libs/models/cartItem.model';

type TProps = {
  item: ICartItem;
  id: ICartItem['id'];
  name: string;
  amount: number;
  price: number;
  onRemove: (id: ICartItem['id']) => void;
  onAdd: (item: ICartItem) => void;
};

const CartItem = ({
  item,
  id,
  name,
  amount,
  price,
  onRemove,
  onAdd,
}: TProps) => {
  const priceTwoDecimal = `$${price.toFixed(2)}`;

  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{priceTwoDecimal}</span>
          <span className={styles.amount}>x {amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={() => onRemove(id)}>−</button>
        <button onClick={() => onAdd(item)}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
