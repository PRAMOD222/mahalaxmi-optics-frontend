"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { addToCart, getCart, removeFromCart } from "@/store/cartSlice";
import Navbar from "@/components/Navbar";


const baseApi = process.env.NEXT_PUBLIC_BASE_API;
const Page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const handleIncreaseQuantity = async (item) => {
    await dispatch(addToCart(item));
    dispatch(getCart());
  };

  const handleDecreaseQuantity = async (id) => {
    await dispatch(removeFromCart({ product: id }));
    dispatch(getCart());
  };

  const removeAnItem = async (id, quantity) => {
    await dispatch(removeFromCart({ product: id, quantity }));
    dispatch(getCart());
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = item.product?.discounted_price || item.product.price;
      return total + price * item.quantity;
    }, 0);
  };

  return (
    <>
    <Navbar/>

    <div className="mx-4 md:mx-32">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col">
          <table className="min-w-full table-auto border-collapse">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 flex items-center py-4">
                    {item.product.images[item.product.colors[0].color_name] && (
                      <Image
                        height={1000}
                        width={1000}
                        src={`${baseApi}${item.product.images[item.product.colors[0].color_name][0]}`}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                    )}
                    <span className="font-medium text-lg">{item.product.name}</span>
                  </td>
                  <td className="py-2 px-4">₹{item.product.discounted_price || item.product.price}</td>
                  <td className="py-2 px-4">
                    <div className="space-x-2 border-2 rounded-md border-black w-fit">
                      <button
                        onClick={() => handleDecreaseQuantity(item.product)}
                        className="text-black py-2 h-full px-2 text-md border-r rounded-l-md border-black hover:bg-gray-300 w-fit"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleIncreaseQuantity(item.product)}
                        className="text-black py-2 h-full px-2 text-md border-l rounded-r-md border-black hover:bg-gray-300"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="py-2 px-4 flex justify-end">
                    <p className="font-[500]">₹{((item.product.discounted_price || item.product.price) * item.quantity).toFixed(2)}</p>
                    <button
                      onClick={() => removeAnItem(item.product, item.quantity)}
                      className="bg-gray-200 text-xs mx-2 text-gray-500 px-1 rounded-full py-1 hover:bg-gray-300"
                    >
                      <IoMdClose />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6 w-full flex flex-col md:w-[40%] ml-auto">
            <h2 className="flex justify-between text-xl font-semibold">
              Grand Total: <span className="text-green-600">₹{calculateTotal().toFixed(2)}</span>
            </h2>
            <Link
              href="/checkout"
              className="flex items-center justify-center mt-4 bg-black text-white px-4 py-2 hover:bg-gray-800"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Page;