// store/componentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedComponents: [],
};

const componentSlice = createSlice({
  name: 'components',
  initialState,
  reducers: {
    addComponent(state, action) {
      state.selectedComponents.push(action.payload);
    },
    removeComponent(state, action) {
      state.selectedComponents = state.selectedComponents.filter(
        (component) => component.id !== action.payload.id
      );
    },
    clearComponents(state) {
      state.selectedComponents = [];
    },
  },
});

export const { addComponent, removeComponent, clearComponents } = componentSlice.actions;
export default componentSlice.reducer;
