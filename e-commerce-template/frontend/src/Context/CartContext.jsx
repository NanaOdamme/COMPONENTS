import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, { ...action.payload, quantity: 1 }];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
      );
    default:
      return state;
  }
};

const initializeCart = () => {
  const storedCart = localStorage.getItem('cart');
  return storedCart ? JSON.parse(storedCart) : [];
};




export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], initializeCart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = item => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = id => dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const increaseQuantity = id => dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  const decreaseQuantity = id => dispatch({ type: 'DECREASE_QUANTITY', payload: id });

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
