import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedColor: null,
  mainImage: null,
  images: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct(state, action) {
      const product = action.payload;
      const defaultColor = product.colors[0]?.color_name || "";
      state.selectedColor = defaultColor;
      state.images = product.images;
      state.mainImage = product.images[defaultColor]?.[0] || "";
    },
    setSelectedColor(state, action) {
      const color = action.payload;
      state.selectedColor = color;
      state.mainImage = state.images[color]?.[0] || "";
    },
    setMainImage(state, action) {
      state.mainImage = action.payload;
    },
  },
});

export const { setProduct, setSelectedColor, setMainImage } = productSlice.actions;
export default productSlice.reducer;
