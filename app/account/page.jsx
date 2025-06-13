"use client";

import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBox, FaHeart, FaUser } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const AccountPage = () => {


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

  const [addressForm, setAddressForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const [visibleOrders, setVisibleOrders] = useState(2);
  const [visibleWishlist, setVisibleWishlist] = useState(2);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [address, setAddress] = useState([]);
  const [userDetails, setUserDetails] = useState(null);

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

  const handleAddressSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    console.log("Address submitted:", addressForm);

    try {
      const response = await fetch(`${baseApi}/users/add-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(addressForm),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add address");
      }

      alert("Address added successfully");
      console.log("Response:", data);
      setIsAddAddressOpen(false);
      fetchAddress();
      setAddressForm({
        fullName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: "",
      });
      // Optionally update UI here
    } catch (error) {
      alert("Error adding address: " + error.message);
      console.error("Address submission error:", error);
    }
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

  const handleDeleteAddress = (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = fetch(`${baseApi}/users/delete-address/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        alert("Address deleted successfully");
        fetchAddress();
      } else {
        alert("Failed to delete address");
      }
    } catch (error) {

    }
  };

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${baseApi}/users/get-user-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch user details");
      }
      // console.log("User details fetched:", data);
      setUserDetails(data);
    } catch (error) {
      alert("Error fetching user details: " + error.message);
      console.error("User details fetching error:", error);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchUserDetails();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-6 md:mx-32 py-4">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              {/* Welcome, {userDetails.name}! */}
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
            {userDetails && <div>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {userDetails.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {userDetails.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {userDetails.phone}
              </p>
            </div>}

          </div>
        </div>
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaLocationDot className="mr-2 text-[#763f98]" /> Address Details
            </h2>
          </div>

          <button onClick={() => setIsAddAddressOpen(true)} className="bg-[#763f98] text-white font-bold px-4 py-2 rounded ">Add Address</button>

          <Dialog open={isAddAddressOpen} onOpenChange={setIsAddAddressOpen}>
            {/* <DialogTrigger>Open</DialogTrigger> */}
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Address</DialogTitle>
                <form onSubmit={handleAddressSubmit} className="space-y-4">
                  <input type="text" name="fullName" placeholder="Full Name" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.fullName} onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })} />
                  <input type="text" name="addres" placeholder="Adress" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.address} onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })} />
                  <input type="text" name="city" placeholder="City" className="w-full p-2 border rounded focus:outline-none   focus:border-[#763f98]" required value={addressForm.city} onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })} />
                  <input type="text" name="state" placeholder="State" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.state} onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })} />
                  <input type="text" name="Postal Code" placeholder="zipCode" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.zipCode} onChange={(e) => setAddressForm({ ...addressForm, zipCode: e.target.value })} />
                  <input type="text" name="country" placeholder="Country" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.country} onChange={(e) => setAddressForm({ ...addressForm, country: e.target.value })} />
                  <input type="tel" name="phone" placeholder="Mobile Number" className="w-full p-2 border rounded focus:outline-none focus:border-[#763f98]" required value={addressForm.phone} onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })} />

                  <button type="submit" className="bg-[#763f98] text-white font-bold px-4 py-2 rounded ">Submit</button>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 py-2">

            {address && address.map((item) => (

              <div key={item._id} className="border rounded-md p-4">
                <p className="text-gray-700">
                  <span className="font-medium">Full Name:</span> {item.fullName}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> {item.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Address:</span> {item.address}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Pin Code:</span> {item.zipCode}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">City:</span> {item.city}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">State:</span> {item.state}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Country:</span> {item.country}
                </p>

                <div className="flex justify-end">
                  <button onClick={() => handleDeleteAddress(item._id)} className="bg-[#763f98] text-white font-bold px-4 py-2 rounded ">Delete</button>
                </div>
              </div>

            ))}

          </div>

        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg p-8 mb-12 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <FaBox className="mr-2 text-[#763f98]" /> Recent Orders
          </h2>
          {/* <div className="space-y-6">
            {orders.slice(0, visibleOrders).map((order) => (
              <div key={order.id}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 border rounded-lg">

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    
                    <img
                      src={order.productImage}
                      alt="Product"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />

                    <div>
                      <p className="text-gray-700">
                        <span className="font-medium">Order ID:</span> #
                        {order.id}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Date:</span> {order.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:text-right sm:items-end gap-2 sm:gap-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Total:</span> ${order.total}
                    </p>
                    <p
                      className={`text-sm font-semibold ${order.status === "Delivered"
                        ? "text-green-500"
                        : "text-yellow-500"
                        }`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div> */}
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
          {/* <div className="space-y-6">
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
          </div> */}
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
