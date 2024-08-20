// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './Context/ThemeContext';
import { CartProvider } from './Context/CartContext';
import 'bootstrap-icons/font/bootstrap-icons.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider>
   
    <CartProvider>
      <App />
    </CartProvider>
    
  </ThemeProvider>
);
