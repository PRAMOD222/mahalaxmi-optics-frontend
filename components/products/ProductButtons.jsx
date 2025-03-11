"use client";
import { addToCart, getCart, removeFromCart } from "@/store/cartSlice";
import Link from "next/link";
import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ProductButtons = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const authUser = useSelector((state) => state.auth.user);
  const item = cartItems.find((item) => item._id === product._id);




  const handleIncreaseQuantity = async(id) => {
    await dispatch(addToCart(product));
    dispatch(getCart())
  };

  const handleDecreaseQuantity = async(id) => {
    await dispatch(removeFromCart({product}));
    dispatch(getCart())
  };

  const handleAddToCart = async() => {
    await dispatch(addToCart(product));
    dispatch(getCart())
  };

  return (
    <div className="flex flex-row mt-2 space-x-3 items-center">
      {item ? (
        <div className="flex border-2 border-black rounded-md items-center space-x-4">
          <button
            onClick={() => handleDecreaseQuantity(product._id)}
            className="text-black px-2 py-3 border-r-2 bg-[#763f98] rounded-l-md hover:bg-gray-300"
          >
            <FaMinus />
          </button>
          <span className="text-xl">{item?.quantity}</span>
          <button
            onClick={() => handleIncreaseQuantity(product._id)}
            className="text-black px-2 py-3 rounded-r-md border-l-2 bg-[#763f98] hover:bg-gray-300"
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-[#763f98] rounded-full font-[900] text-sm h-full text-white px-6 py-4 hover:bg-gray-800"
        >
          Add to Cart
        </button>
      )}

      <Link
        href={`/checkout/${product._id}`}
        className="bg-[#763f98] text-sm rounded-full font-[900] h-full text-white px-6 py-4 hover:bg-gray-800"
      >
        Buy Now
      </Link>
    </div>
  );
};

export default ProductButtons;
