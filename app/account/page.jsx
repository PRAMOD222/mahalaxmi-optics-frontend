"use client";

import Navbar from "@/components/Navbar";
import { logout } from "@/store/authSlice";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FaBox, FaHeart, FaUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button"; // Shadcn Button
import { Input } from "@/components/ui/input"; // Shadcn Input

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const AccountPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);
  const [address, setAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressToDelete, setAddressToDelete] = useState(null);
  const router = useRouter();

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${baseApi}/users/get-address`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setAddresses(data.shippingAddress);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleAddAddress = () => {
    try {
      fetch(`${baseApi}/users/add-address`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Address added successfully:", data);
          fetchAddresses();
        })
        .catch((error) => {
          console.error("Error adding address:", error);
        });
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleDeleteAddress = (addressId) => {
    try {
      fetch(`${baseApi}/users/delete-address/${addressId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Address deleted successfully:", data);
          fetchAddresses();
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
        });
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddAddress();
    closeModal();
  };

  const confirmDelete = (addressId) => {
    setAddressToDelete(addressId);
  };

  const handleConfirmDelete = () => {
    if (addressToDelete) {
      handleDeleteAddress(addressToDelete);
      setAddressToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setAddressToDelete(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-6 md:mx-32 py-4 md:w-1/2">
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {user?.name}!
            </h1>
            <p className="text-gray-600 mt-2">Your Account Overview</p>
          </div>
        </div>

        <div className="relative bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-gray-700" /> User Details
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
            <div>
              <p className="text-gray-700">
                <span className="font-medium">Name:</span> {user?.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Phone:</span> {user?.phone}
              </p>
            </div>
          </div>
          <div className="absolute rounded-md shadow-md bg-white right-0 top-0 m-4 p-2">
            <PencilIcon className="text-gray-700" />
          </div>
        </div>
      </div>

      <div className="mx-6 md:mx-32 py-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Addresses</h2>
        <Button
          onClick={openModal}
          className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
        >
          Add New Address
        </Button>
        <div className="space-y-4 mt-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm"
            >
              <p className="text-gray-700 font-medium">{addr.fullName}</p>
              <p className="text-gray-700">{addr.address}</p>
              <p className="text-gray-700">
                {addr.city}, {addr.state} {addr.zipCode}
              </p>
              <p className="text-gray-700">{addr.country}</p>
              <p className="text-gray-700">{addr.phone}</p>
              <Button
                onClick={() => confirmDelete(addr._id)}
                className="mt-4 bg-white text-gray-800 border border-gray-300 hover:bg-gray-50 flex items-center"
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                Delete Address
              </Button>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-lg font-bold mb-4">Add New Address</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={address.fullName}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="address"
                placeholder="Address"
                value={address.address}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={address.zipCode}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleInputChange}
                required
              />
              <Input
                type="text"
                name="phone"
                placeholder="Phone"
                value={address.phone}
                onChange={handleInputChange}
                required
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  onClick={closeModal}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button type="submit">Save Address</Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {addressToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
            <p className="mb-4">Are you sure you want to delete this address?</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={handleCancelDelete}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmDelete}
                variant="destructive"
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountPage;