// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './componentSlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';
const store = configureStore({
  reducer: {
    cart: cartReducer,
    product: productReducer,
  },
});

export default store;
