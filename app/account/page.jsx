"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBox, FaHeart, FaUser } from "react-icons/fa6";

const AccountPage = () => {
  // Dummy data for demonstration
  const userDetails = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+91 123 456 7890",
    address: "123 Main St, City, Country",
    pincode: "12345",
    city: "City",
    state: "State",
    joined: "January 2022",
  };

  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2023-10-01",
      total: 50000,
      status: "Delivered",
      productImage: "/glass3.png",
    },
    {
      id: 2,
      date: "2023-09-25",
      total: 12000,
      status: "Shipped",
      productImage: "/glass4.png",
    },
  ]);

  const [wishlist, setWishlist] = useState([
    { id: 1, name: "Ray Ban RB 90102R", price: 25000, image: "/glass1.png" },
    { id: 2, name: "Oakley OO 9208", price: 40000, image: "/glass2.png" },
  ]);

  const [visibleOrders, setVisibleOrders] = useState(2);
  const [visibleWishlist, setVisibleWishlist] = useState(2);

  const loadMoreOrders = () => {
    setVisibleOrders((prev) => prev + 2);
  };

  const loadMoreWishlist = () => {
    setVisibleWishlist((prev) => prev + 2);
  };

  const handleLogout = () => {
    alert("Logging out...");
    
  };

  const handleEditProfile = () => {
    alert("Redirecting to edit profile...");
    
  };

  const handleAddToCart = (item) => {
    alert(`${item.name} added to cart`);
    
  };

  const handleViewOrders = () => {
    alert("Redirecting to orders page...");
  };

  const handleViewWishlist = () => {
    alert("Redirecting to wishlist page...");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-6 md:mx-32 py-4">
        
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
        <div className="text-center md:text-left">
    <h1 className="text-2xl font-bold text-gray-800">
      Welcome, {userDetails.name}!
    </h1>
    <p className="text-gray-600 mt-2">Your Account Overview</p>
  </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mt-6 md:mt-0">
            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="bg-[#763f98] text-white font-bold px-4 py-2  hover:bg-purple-600 transition duration-300 flex items-center"
            >
              <FaUser className="mr-2 " /> Edit Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white font-bold px-4 py-2  hover:bg-red-600 transition duration-300 flex items-center"
            >
              <FaSignOutAlt className="mr-2 " /> Logout
            </button>
          </div>
        </div>

        {/* User Details */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-[#763f98]" /> User Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {userDetails.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {userDetails.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {userDetails.phone}
              </p>
            </div>
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Address:</span>{" "}
                {userDetails.address}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">City:</span> {userDetails.city}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">State:</span> {userDetails.state}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaBox className="mr-2 text-[#763f98]" /> Recent Orders
          </h2>
          <div className="space-y-6">
            {orders.slice(0, visibleOrders).map((order) => (
              <div
                key={order.id}
                
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border rounded-lg">
  {/* Left Section: Image and Order Details */}
  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
    {/* Product Image */}
    <img
      src={order.productImage}
      alt="Product"
      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
    />

    {/* Order Details */}
    <div>
      <p className="text-gray-700">
        <span className="font-medium">Order ID:</span> #{order.id}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Date:</span> {order.date}
      </p>
    </div>
  </div>

  {/* Right Section: Total and Status */}
  <div className="flex flex-col sm:text-right sm:items-end gap-2 sm:gap-1">
    <p className="text-gray-700">
      <span className="font-medium">Total:</span> ${order.total}
    </p>
    <p
      className={`text-sm font-semibold ${
        order.status === "Delivered" ? "text-green-500" : "text-yellow-500"
      }`}
    >
      {order.status}
    </p>
  </div>
</div>

              </div>
            ))}
          </div>
          {visibleOrders < orders.length && (
            <button
              onClick={loadMoreOrders}
              className="mt-6 w-full bg-[#763f98] text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Load More Orders
            </button>
          )}
          <button
            onClick={handleViewOrders}
            className="mt-4 w-full bg-[#763f98] text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            View All Orders
          </button>
        </div>

        {/* Recent Wishlist */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaHeart className="mr-2 text-[#763f98]" /> Recent Wishlist
          </h2>
          <div className="space-y-6">
            {wishlist.slice(0, visibleWishlist).map((item) => (
              <div
                key={item.id}
                className="border p-6 rounded-lg border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.name}
                    </h3>
                    <p className="text-gray-600">₹{item.price}</p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="mt-4 bg-[#9547a7] text-white px-4 py-2  hover:bg-[#763f98] transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {visibleWishlist < wishlist.length && (
            <button
              onClick={loadMoreWishlist}
              className="mt-6 w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
            >
              Load More Wishlist
            </button>
          )}
          <button
            onClick={handleViewWishlist}
            className="mt-4 w-full text-center bg-[#763f98] text-white font-bold px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            View All Wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
