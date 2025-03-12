"use client";
import { addToCart, getCart, toggleSlider } from "@/store/cartSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({text, product}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const authUser = useSelector((state) => state.auth.user);
  const item = cartItems.find((item) => item._id === product._id);

  const handleAddToCart = async () => {
    await dispatch(addToCart(product));
    await dispatch(getCart());
    dispatch(toggleSlider(true));

  };
  return <div onClick={handleAddToCart}>
    {
        text
    }
  </div>;
};

export default AddToCart;
