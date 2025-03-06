"use client";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; // Custom imports
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import ConfirmDeleteDialog from "@/components/ConfirmDeleteDialog";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const App = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    rating: 0,
  });
  const [editId, setEditId] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for opening/closing modal
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // Track which testimonial to delete

  // Fetch all testimonials from the API
  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${baseApi}/testimonials/all-testimonials`);
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.rating) {
      alert("Please select a rating.");
      return;
    }

    try {
      const url = editId
        ? `${baseApi}/testimonials/edit-testimonial/${editId}`
        : `${baseApi}/testimonials/add-testimonial`;
      const method = editId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save testimonial.");

      const data = await response.json();
      fetchTestimonials();

      setFormData({ name: "", message: "", rating: 0 });
      setEditId(null);
      setIsOpen(false); // Close the modal after form submission
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Handle testimonial deletion
  const handleDelete = async () => {
    try {
      await fetch(`${baseApi}/testimonials/delete-testimonial/${deleteId}`, {
        method: "DELETE",
      });
      setTestimonials(
        testimonials.filter((testimonial) => testimonial._id !== deleteId)
      );
      setOpenDeleteDialog(false); // Close the delete dialog after successful deletion
      setDeleteId(null)
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      setOpenDeleteDialog(false); // Close dialog even if delete fails
    }
  };

  // Set form data for editing
  const handleEdit = (testimonial) => {
    setFormData({
      name: testimonial.name,
      message: testimonial.message,
      rating: testimonial.rating,
    });
    setEditId(testimonial._id);
    setIsOpen(true); // Open the modal on edit
  };

  // Render stars for the rating system
  const renderStars = (rating, onClick) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          size={20}
          style={{ cursor: onClick ? "pointer" : "default", marginRight: 5 }}
          color={i <= rating ? "#ffc107" : "#e4e5e9"}
          onClick={onClick ? () => onClick(i) : null}
        />
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Testimonials</h1>

      {/* Dialog (Modal) Wrapper */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Add Testimonial Button - Trigger to open the Dialog */}
        <DialogTrigger asChild>
          <button className="px-4 py-2 bg-[#007dc6] text-white rounded-md hover:bg-[#00a651] transition-all mb-8">
            Add Testimonial
          </button>
        </DialogTrigger>

        {/* Modal content */}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editId ? "Edit" : "Add"} Testimonial</DialogTitle>
            <DialogDescription>
              Please fill in the details below.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              required
              className="w-full p-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">Rating: </span>
              {renderStars(formData.rating, (rating) =>
                setFormData({ ...formData, rating })
              )}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)} // Close modal
                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                {editId ? "Update" : "Add"} Testimonial
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Testimonials List */}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial._id}
            className="p-4 border rounded-md shadow-md text-center flex flex-col justify-center items-center gap-2"
          >
            <h3 className="text-xl font-bold capitalize">{testimonial.name}</h3>
            <div className="flex items-center my-1">
              {renderStars(testimonial.rating)}
            </div>
            <p className="mb-2 text-sm text-gray-500">{testimonial.message}</p>
            <div className="mt-4 flex gap-4">
              <CiEdit
                onClick={() => handleEdit(testimonial)}
                className="inline text-2xl text-[#00a651] hover:text-green-600 transition-all duration-150 cursor-pointer hover:scale-110"
              />
              <MdDelete
                onClick={() => {
                  setDeleteId(testimonial._id); // Set the id of the testimonial to delete
                  setOpenDeleteDialog(true); // Open the confirm delete dialog
                }}
                className="inline text-2xl text-red-500 hover:text-red-600 transition-all duration-150 cursor-pointer hover:scale-110"
              
              />
            </div>
          </li>
        ))}
      </ul>

      {/* Confirm Delete Dialog */}
      <ConfirmDeleteDialog
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => handleDelete()}
      />
    </div>
  );
};

export default App;
