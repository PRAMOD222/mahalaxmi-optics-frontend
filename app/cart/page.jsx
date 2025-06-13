"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { addToCart, getCart, removeFromCart } from "@/store/cartSlice";
import Navbar from "@/components/Navbar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import Footer from "@/components/Footer";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Page = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [address, setAddress] = useState(null);

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

  const router = useRouter();

  const handlePlaceOrder = async () => {
    try {
      const address = {
        fullName: "John Doe",
        address: "123 Test Street",
        city: "Testville",
        state: "TestState",
        zipCode: "123456",
        country: "India",
        phone: "9876543210",
      };

      const response = await axios.post(`${baseApi}/orders/cart/initiate`, {
        address,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const { data } = response;

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        alert("Payment link not generated.");
      }
    } catch (error) {
      console.error("Order Error:", error.response?.data || error.message);
      alert("Something went wrong while placing the order.");
    }
  };

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const fetchAddress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseApi}/users/get-address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch address");
      }
      setAddress(data);
      console.log("Address fetched:", data);

    } catch (error) {
      alert("Error fetching address: " + error.message);
      console.error("Address fetching error:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <>
      <div className="z-40">
        <TopBar />
      </div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      <div className="mx-4 md:mx-32">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col">
            {/* Mobile View */}
            <div className="md:hidden">
              {cartItems.map((item) => (
                <div key={item._id} className="border-b py-4">
                  <div className="flex items-center">
                    {item.product.thumbnail && (
                      <Image
                        height={100}
                        width={100}
                        src={`${baseApi}${
                          item.product.thumbnail
                        }`}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                    )}
                    <div className="flex-1">
                      <span className="font-medium text-lg">
                        {item.product.name}
                      </span>
                      <p className="text-gray-600">
                        ₹{item.product.discounted_price || item.product.price}
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="space-x-2 border-2 rounded-md border-black w-fit">
                          <button
                            onClick={() => handleDecreaseQuantity(item.product)}
                            className="text-black py-1 px-2 text-md border-r rounded-l-md border-black hover:bg-gray-300"
                          >
                            <FaMinus />
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.product)}
                            className="text-black py-1 px-2 text-md border-l rounded-r-md border-black hover:bg-gray-300"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <button
                          onClick={() =>
                            removeAnItem(item.product, item.quantity)
                          }
                          className="bg-gray-200 text-xs mx-2 text-gray-500 px-1 rounded-full py-1 hover:bg-gray-300"
                        >
                          <IoMdClose />
                        </button>
                      </div>
                      <p className="font-[500] mt-2">
                        Total: ₹
                        {(
                          (item.product.discounted_price ||
                            item.product.price) * item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop View */}
            <table className="hidden md:table min-w-full table-auto border-collapse">
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
                      {item.product.images[
                        item.product.colors[0].color_name
                      ] && (
                        <Image
                          height={1000}
                          width={1000}
                          src={`${baseApi}${
                            item.product.images[
                              item.product.colors[0].color_name
                            ][0]
                          }`}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                      )}
                      <span className="font-medium text-lg">
                        {item.product.name}
                      </span>
                    </td>
                    <td className="py-2 px-4">
                      ₹{item.product.discounted_price || item.product.price}
                    </td>
                    <td className="py-2 px-4">
                      <div className="space-x-2 border-2 rounded-md border-black w-fit">
                        <button
                          onClick={() => handleDecreaseQuantity(item.product)}
                          className="text-black py-2 h-full px-2 text-md border-r rounded-l-md border-black hover:bg-gray-300"
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
                      <p className="font-[500]">
                        ₹
                        {(
                          (item.product.discounted_price ||
                            item.product.price) * item.quantity
                        ).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          removeAnItem(item.product, item.quantity)
                        }
                        className="bg-gray-200 text-xs mx-2 text-gray-500 px-1 rounded-full py-1 hover:bg-gray-300"
                      >
                        <IoMdClose />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Grand Total and Checkout Button */}
            <div className="my-6 w-full flex flex-col md:w-[40%] ml-auto">
              <h2 className="flex justify-between text-xl font-semibold">
                Grand Total:{" "}
                <span className="text-green-600">
                  ₹{calculateTotal().toFixed(2)}
                </span>
              </h2>
              <button
                onClick={handleDialogOpen}
                className="flex items-center justify-center mt-4 bg-black text-white px-4 py-2 hover:bg-gray-800"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
        <Dialog className="min-h-[70vh]" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader className="min-h-[70vh]">
              <DialogTitle>Order Summary</DialogTitle>
              <ScrollArea className="w-full h-[60vh] rounded-md border p-4">

                <table className="hidden md:table min-w-full table-auto border-collapse">
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
                              className="text-black py-2 h-full px-2 text-md border-r rounded-l-md border-black hover:bg-gray-300"
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

                <div className="address">
                  {address && address.map((item, index) => (
                    <div key={index}>
                      <h2 className="text-lg font-semibold">Address {index + 1}</h2>
                      <p>{item.address}</p>
                      <p>{item.city}</p>
                      <p>{item.pincode}</p>
                    </div>
                  ))}
                </div>


                {/* Grand Total and Checkout Button */}
                <div className="my-6 w-full flex flex-col md:w-[40%] ml-auto ">
                  <h2 className="flex justify-between text-xl font-semibold">
                    Grand Total: <span className="text-green-600">₹{calculateTotal().toFixed(2)}</span>
                  </h2>
                  <button
                    onClick={handlePlaceOrder}
                    className="flex items-center justify-center mt-4 bg-[#763f98] text-white px-4 py-2 hover:bg-purple-700"
                  >
                    Proceed to Pay
                  </button>
                </div>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default Page;
 