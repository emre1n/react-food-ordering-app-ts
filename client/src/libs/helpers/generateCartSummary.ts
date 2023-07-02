import ICartItem from '../models/cartItem.model';

export default function generateCartSummary(cartItems: ICartItem[]): {
  summary: string;
  cartTotal: string;
} {
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
}
