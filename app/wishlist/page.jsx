"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import the trash icon

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const WishlistPage = () => {
  const [wishlist, setWishList] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const fetchWishList = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${baseApi}/users/wishlist`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("data:", data);
      setWishList(data);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  useEffect(() => {
    fetchWishList();
  }, [token]);

  const removeFromWishlist = async (productId) => {
    try {
      await fetch(`${baseApi}/users/remove-from-wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      // Refresh the wishlist after removal
      fetchWishList();
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-4 px-4 md:px-36">
        <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h1>
        {wishlist.length > 0 ? (
          <div className="space-y-4">
            {wishlist.map((item) => (
              <div key={item._id} className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={`${baseApi}${item.images.Black[0]}`}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-sm text-gray-600">
                      ₹{item.discounted_price || item.price}
                    </p>
                  </div>
                  {/* Actions (View and Remove) */}
                  <div className="flex items-center space-x-4">
                    <Link
                      href={`/product/${item.name}`}
                      className="text-sm font-medium text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default WishlistPage;