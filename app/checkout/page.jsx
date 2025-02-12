"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "@/store/cartSlice";
import Link from "next/link";
import Image from "next/image";
const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  const groupedCart = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      acc.push({ ...item });
    }
    return acc;
  }, []);

  const cartTotal = groupedCart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    dispatch(clearCart());
    alert("Order placed successfully!"); 
  };

  return (
    <div className="mx-4 md:mx-32">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {groupedCart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Please add items before proceeding.</p>
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
              {groupedCart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="px-4 py-4 flex items-center">
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
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
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
            <button
              onClick={handlePlaceOrder}
              className="flex items-center justify-center mt-4 bg-black text-white px-4 py-2 hover:bg-gray-800"
            >
              Place Order
            </button>
            <Link
              href="/"
              className="flex items-center justify-center mt-4 bg-gray-200 text-black px-4 py-2 hover:bg-gray-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
