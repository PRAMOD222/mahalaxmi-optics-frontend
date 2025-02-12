"use client";
import { addItem, updateQuantity } from "@/store/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";

const ProductButtons = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const item = cartItems.find((item) => item.id === product.id);

  useEffect(() => {
    console.log("cartItems", cartItems);
  }, [cartItems]);
  const handleIncreaseQuantity = (id) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  const addToCart = () => {
    dispatch(addItem(product));
  };
  return (
    <div>
      <div className="flex flex-row space-x-3 items-center ">
        {item ? (
          <div className="flex border-2 border-black rounded-md items-center space-x-4 ">
            <button
              onClick={() => handleDecreaseQuantity(product.id)}
              className=" text-black px-2 py-3 border-r-2 border-black rounded-l-md  hover:bg-gray-300"
            >
              <FaMinus />
            </button>
            <span className="text-xl">{item?.quantity}</span>
            <button
              onClick={() => handleIncreaseQuantity(product.id)}
              className=" text-black px-2 py-3 rounded-r-md border-l-2 border-black  hover:bg-gray-300"
            >
              <FaPlus />
            </button>
          </div>
        ) : (
          <button
            onClick={() => addToCart()}
            className="bg-black/80 text-sm font-[500] h-full text-white px-6 py-4   hover:bg-gray-800"
          >
            Add to Cart
          </button>
        )}

        <Link
          href={`/checkout/${product.id}`}
          className="bg-black/80 text-sm font-[500] h-full text-white px-6 py-4   hover:bg-gray-800"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default ProductButtons;
