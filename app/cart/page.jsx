"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeItem, updateQuantity } from "@/store/cartSlice";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  // Group items by their ID and sum up the quantities
  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const handleRemoveItem = (id) => {
    dispatch(removeItem({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleIncreaseQuantity = (id) => {
    dispatch(updateQuantity({ id, quantity: 1 }));
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(updateQuantity({ id, quantity: -1 }));
  };

  const cartTotal = groupedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="mx-4 md:mx-32">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {groupedCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col">
          <table className="min-w-full table-auto border-collapse">
            <thead className="border-b border-gray-300">
              <tr className="pb-4">
                <th className="py-2 px-4 text-left pb-4">Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {groupedCart.map((item) => (
                <tr key={item.id} className="border-b ">
                  <td className=" px-4 flex items-center py-8">
                    {item.image && (
                      <Image height={1000} width={1000}
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                    )}
                    <span className="font-medium text-lg">{item.name}</span>
                  </td>
                  <td className="py-2 px-4">₹{item.price}</td>
                  <td className="py-2  px-4">
                    <div className=" space-x-2 border-2  rounded-md border-black w-fit">
                      <button
                        onClick={() => handleDecreaseQuantity(item.id)}
                        className=" text-black py-2 h-full px-2 text-md border-r rounded-l-md border-black hover:bg-gray-300 w-fit"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2  py-2  ">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.id)}
                        className=" text-black py-2 h-full px-2 text-md border-l rounded-r-md border-black hover:bg-gray-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 ">
                    <div className="flex flex-row items-right justify-end space-x-2">
                      <p className="font-[500]">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="bg-gray-200 text-xs mx-2 text-gray-500 px-1 rounded-full py-1 hover:bg-gray-300"
                      >
                        <IoMdClose/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 w-full flex flex-col md:w-[40%] ml-auto">
            <h2 className="flex justify-between text-xl font-semibold">
              Grand Total:{" "}
              <span className="text-green-600">₹{cartTotal.toFixed(2)}</span>
            </h2>
            <Link
              href="/checkout"
              className="flex items-center justify-center mt-4 bg-black text-white px-4 py-2  hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
