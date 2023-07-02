import React from 'react';
import ICartItem from '../libs/models/cartItem.model';

type TCartContext = {
  items: ICartItem[];
  totalAmount: number;
  addItem: (item: ICartItem) => void;
  removeItem: (item: ICartItem) => void;
  clearCart: () => void;
};

const initialState: TCartContext = {
  items: [],
  totalAmount: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
};

const CartContext = React.createContext<TCartContext>(initialState);

export default CartContext;
