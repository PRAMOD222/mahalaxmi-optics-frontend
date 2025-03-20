"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const AddToWishlist = ({ productId }) => {
  const [isInWishList, setIsInWishlist] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));


  const checkWishlist = async () => {
    if (!token) return; // Prevent request if token is null

    try {
      const response = await fetch(`${baseApi}/users/isInWishlist/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setIsInWishlist(data.isInWishlist);
    } catch (error) {
      console.error("Error checking wishlist:", error);
    }
  };

  useEffect(() => {
    checkWishlist();
  }, [token]);

  const AddToWishlist = async () => {
    try {
      fetch(`${baseApi}/users/add-to-wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async () => {
    try {
      fetch(`${baseApi}/users/remove-from-wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };
  const handleClick = () => {
    setIsInWishlist(!isInWishList);
    isInWishList ? removeFromWishlist() : AddToWishlist();
  };
  return (
    <Button
      onClick={handleClick}
      className="text-2xl bg-transparent shadow-none hover:bg-transparent text-black"
    >
      {isInWishList ? <FaHeart /> : <FaRegHeart />}
    </Button>
  );
};

export default AddToWishlist;
