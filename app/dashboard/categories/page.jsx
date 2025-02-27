"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Categories = () => {
  const [category, setCategory] = useState({
    name: "",
    description: "",
    images: [],
  });
  const [categories, setCategories] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addCategoryOpen, setAddCategoryOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseApi}/api/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setCategory({ ...category, images: e.target.files });
  };

  const handleEdit = (cat) => {
    setCategory({
      _id: cat._id,
      name: cat.name,
      description: cat.description,
      images: cat.image,
    });
    setIsEditMode(true);
    setAddCategoryOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    for (let i = 0; i < category.images.length; i++) {
      formData.append("image", category.images[i]);
    }
    try {
      if (isEditMode) {
        await fetch(`${baseApi}/api/categories/${category._id}`, {
          method: "PUT",
          body: formData,
        });
        toast.success("Category updated!");
      } else {
        await axios.post(`${baseApi}/api/categories`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Category added!");
      }
      fetchCategories();
      setAddCategoryOpen(false);
    } catch (error) {
      toast.error("Error saving category");
    }
  };

  const handleDelete = async (categoryId) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await fetch(`${baseApi}/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      toast.success("Category deleted!");
      fetchCategories();
    } catch (error) {
      toast.error("Error deleting category");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setAddCategoryOpen(true)} className="bg-blue-500 text-white">
        Add Category
      </Button>
      <Dialog open={addCategoryOpen} onOpenChange={setAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Category" : "Add Category"}</DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-2">
              <Input type="text" name="name" value={category.name} onChange={handleChange} placeholder="Category Name" required />
              <Textarea name="description" value={category.description} onChange={handleChange} placeholder="Description" required />
              <Input type="file" name="image" multiple onChange={handleFileChange} required={!isEditMode} />
              <Button type="submit" className="bg-blue-500 text-white">
                {isEditMode ? "Update Category" : "Add Category"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {categories.map((cat) => (
          <div key={cat._id} className="border rounded p-4">
            <Image src={`${baseApi}/api${cat.image}`} alt={cat.name} width={200} height={200} className="aspect-square w-full object-cover" />
            <h2 className="text-lg font-semibold mt-2">{cat.name}</h2>
            <p className="text-gray-600">{cat.description}</p>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleEdit(cat)} className="bg-yellow-500 text-white">Edit</Button>
              <Button onClick={() => handleDelete(cat._id)} className="bg-red-500 text-white">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
