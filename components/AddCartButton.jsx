"use client";
import { addToCart } from "@/store/cartSlice";
import React, { useEffect } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const AddCartButton = ({ product }) => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  useEffect(()=>{
    console.log("cartItems:", cartItems);
  }, [cartItems])
  const addToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    dispatch(addToCart(product));
  };
  return (
    <div
      // href={`/cart/${product.id}`}
      onClick={addToCart}
      className="flex items-start w-fit h-fit space-x-3 bg-[#EDEDED] px-6 py-3 rounded-sm font-[400] hover:bg-gray-300"
    >
      <FiShoppingCart className="text-xl" />
      <p>Add to cart</p>
    </div>
  );
};

export default AddCartButton;
