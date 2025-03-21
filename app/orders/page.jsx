"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchOrders = () => {
    fetch(`${baseApi}/users/orders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        console.log("data:", data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4 px-4 md:px-36">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Orders</h1>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
                {/* Order ID (Smaller on Mobile) */}
                <p className="text-sm md:text-base font-medium text-gray-600">
                  Order ID: <span className="text-gray-800">{order.orderId}</span>
                </p>

                {/* Date and Total Amount */}
                <div className="mt-2 flex flex-col md:flex-row md:items-center md:justify-between">
                  <p className="text-sm md:text-base">
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <p className="text-sm md:text-base font-medium">
                    Total Amount: ₹{order.totalAmount}
                  </p>
                </div>

                {/* Status */}
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="mt-4 ">
                  <p className="font-medium">Products:</p>
                  <ul className="space-y-2">
                    {order.products.map((product) => (
                      <li key={product._id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={`${baseApi}${product.product.images.Black[0]}`}
                            alt={product.product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </div>
                        <div>
                          <Link
                            href={`/product/${product.product.name}`}
                            className="font-medium hover:underline"
                          >
                            {product.product.name}
                          </Link>
                          <p className="text-sm text-gray-600">
                            {product.quantity} x ₹{product.product.discounted_price || product.product.price}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Shipping Address (Hidden on Mobile) */}
                <div className="mt-4 hidden md:block">
                  <p className="font-medium">Shipping Address:</p>
                  <div className="space-y-1 text-sm">
                    {/* <p>{order.shippingAddress.fullName}</p> */}
                    <p>{order.shippingAddress.address}</p>
                    <p>
                      {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                      {/* {order.shippingAddress.zipCode} */}
                    </p>
                    {/* <p>{order.shippingAddress.country}</p>
                    <p>{order.shippingAddress.phone}</p> */}
                  </div>
                </div>


              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default OrdersPage;