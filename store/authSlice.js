"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateCart } from "./cartSlice";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

// Async Thunks for API Calls
export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${baseApi}/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Signup failed");

      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin || "user");
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      dispatch(updateCart());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(`${baseApi}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

      console.log("data user:", data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAdmin", data.isAdmin);
        console.log("data.user", data.user)
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      dispatch(updateCart());
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getUserFromLocalStorage = () => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    }
    return null;
  };
  

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
      },
    logout: (state) => {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("user");
      }
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
