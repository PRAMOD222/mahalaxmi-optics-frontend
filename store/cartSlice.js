import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const saveCartToLocalStorage = (cart) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

// Fetch cart from API only if logged in
export const getCart = createAsyncThunk("cart/getCart", async () => {
  if (typeof window === "undefined") return [];
  const token = localStorage.getItem("token");
  if (!token) return getCartFromLocalStorage();

  const response = await fetch(`${baseApi}/users/cart`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return Array.isArray(data) ? data : [];
});

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (item, { getState }) => {
    const token = localStorage.getItem("token");

    if (token) {
      await fetch(`${baseApi}/users/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: item?._id }),
      });
    } else {
      const cart = getState().cart.items || [];
      const updatedCart = [...cart];
      const index = updatedCart.findIndex((i) => i.product._id === item._id);

      if (index !== -1) {
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity + 1,
        };
      } else {
        updatedCart.push({ product: item, quantity: 1 });
      }

      saveCartToLocalStorage(updatedCart);
      return updatedCart;
    }
    return item;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ product, quantity = 1 }, { getState }) => {
    const token = localStorage.getItem("token");

    // console.log("productId:", product);
    // console.log("quantity:", quantity);
    if (token) {
      await fetch(`${baseApi}/users/remove-from-cart/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          quantity,
        }),
      });
    } else {
      console.log("item", product)
      const cart = getState().cart.items || [];
      const updatedCart = [...cart];
      const index = updatedCart.findIndex((i) => i.product._id === product._id);

      if (index !== -1) {
        if (updatedCart[index].quantity > 1) {
          updatedCart[index] = {
            ...updatedCart[index],
            quantity: updatedCart[index].quantity - 1,
          };
        } else {
          updatedCart.splice(index, 1); 
        }
      }
      saveCartToLocalStorage(updatedCart);
      return cart;
    }
    return product;
  }
);


export const updateCart = createAsyncThunk(
  "cart/updateCart",
  async (_, { getState, dispatch }) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const cart = getCartFromLocalStorage();
    if (cart.length === 0) return;

    for (const item of cart) {
      await fetch(`${baseApi}/users/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: item.product._id,
          quantity: item.quantity,
        }),
      });
    }

    saveCartToLocalStorage([]); 
    dispatch(getCart()); 
  }
);


// Clear cart: API if logged in, localStorage if not
export const clearCart = createAsyncThunk("cart/clearCart", async () => {
  const token = localStorage.getItem("token");

  if (token) {
    await fetch(`${baseApi}/users/clear-cart`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } else {
    saveCartToLocalStorage([]);
  }
  return [];
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getCartFromLocalStorage(),
    isSliderOpen: false,
  },
  reducers: {
    toggleSlider: (state, action) => {
      state.isSliderOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        if (!localStorage.getItem("token")) {
          state.items = action.payload;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        if (!localStorage.getItem("token")) {
          state.items = action.payload;
        }
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});
export const { toggleSlider } = cartSlice.actions;
export default cartSlice.reducer;
