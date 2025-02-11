// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import componentReducer from './componentSlice';

const store = configureStore({
  reducer: {
    components: componentReducer,
  },
});

export default store;
