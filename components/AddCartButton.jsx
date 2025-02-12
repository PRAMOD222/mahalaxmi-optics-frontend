"use client";
import { addItem } from "@/store/cartSlice";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch } from "react-redux";

const AddCartButton = ({ product }) => {
  const dispatch = useDispatch();
  const addToCart = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    dispatch(addItem(product));
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
