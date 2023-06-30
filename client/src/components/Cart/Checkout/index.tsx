import styles from './styles.module.css';

type TProps = {
  onCancel: () => void;
};

const Checkout = ({ onCancel }: TProps) => {
  const confirmHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };
  return (
    <form>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" />
      </div>
      <div className={styles.control}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" />
      </div>
      <div className={styles.control}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" />
      </div>
      <div className={styles.control}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" />
      </div>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
      <button>Confirm</button>
    </form>
  );
};

export default Checkout;
