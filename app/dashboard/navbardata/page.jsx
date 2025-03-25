"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const NavbarPage = () => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState("");
  const [navbarInfo, setNavbarInfo] = useState(null);
  const [form, setForm] = useState({
    featuredBrands: [],
    category: "",
    tag: "",
  });

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    fetchBrands();
    fetchCategories();
    getNavbarInfo();
  }, []);

  const getNavbarInfo = async () => {
    try {
      const response = await fetch(`${baseApi}/navbarinfo`);
      const data = await response.json();
      setNavbarInfo(data);
    } catch (error) {
      console.error("Error fetching navbar info:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${baseApi}/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseApi}/categories`);
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleBrandSelection = (brandId) => {
    setForm((prevForm) => {
      const updatedBrands = prevForm.featuredBrands.includes(brandId)
        ? prevForm.featuredBrands.filter((id) => id !== brandId)
        : [...prevForm.featuredBrands, brandId];

      return { ...prevForm, featuredBrands: updatedBrands };
    });
  };

  const handleSave = async (method) => {
    try {
      await fetch(`${baseApi}/navbarinfo`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      getNavbarInfo();
      setIsEditOpen(false);
      setIsAddOpen(false);
      setForm({ featuredBrands: [], category: "", tag: "" }); 
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
    });
    } catch (error) {
      console.error(`Error POST navbar info:`, error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Navbar Information</h2>
      <div className="space-y-2">
        {navbarInfo ? (
          <div className="p-4 border rounded-lg">
            <p>Category: {navbarInfo.category?.name}</p>
            <p>Tag: {navbarInfo.tag}</p>
            <p>Featured Brands: {navbarInfo.featuredBrands.map((brand) => brand.name).join(", ")}</p>
            <div className="mt-2 flex gap-2">
              {/* <Button
                onClick={() => {
                  setForm({
                    featuredBrands: navbarInfo.featuredBrands.map((b) => b._id),
                    category: navbarInfo.category?._id || "",
                    tag: navbarInfo.tag,
                  });
                  setIsEditOpen(true);
                }}
              >
                Edit
              </Button> */}
              <Button variant="destructive" onClick={() => handleSave("DELETE")}>
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <p>No navbar info available.</p>
        )}
      </div>

      <Button
        className="mt-4"
        onClick={() => {
          setForm({ featuredBrands: [], category: "", tag: "" }); // Clear form when adding new
          setIsAddOpen(true);
        }}
      >
        Add Navbar Info
      </Button>

      {/* Add/Edit Dialog */}
      <Dialog
        open={isEditOpen || isAddOpen}
        onOpenChange={(open) => {
          if (!open) {
            setIsEditOpen(false);
            setIsAddOpen(false);
            setForm({ featuredBrands: [], category: "", tag: "" }); // Reset form on close
          }
        }}
      >
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <h3 className="text-lg font-semibold mb-2">{isEditOpen ? "Edit" : "Add"} Navbar Info</h3>

          {/* Multi-Select Dropdown with Checkboxes */}
          <Label>Featured Brands</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {form.featuredBrands.length > 0
                  ? brands
                      .filter((brand) => form.featuredBrands.includes(brand._id))
                      .map((brand) => brand.name)
                      .join(", ")
                  : "Select Brands"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] overflow-y-auto max-h-80 p-2">
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand._id} className="flex items-center space-x-2">
                    <Checkbox
                      id={brand._id}
                      checked={form.featuredBrands.includes(brand._id)}
                      onCheckedChange={() => handleBrandSelection(brand._id)}
                    />
                    <label htmlFor={brand._id} className="cursor-pointer text-sm font-medium">
                      {brand.name}
                    </label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Label>Category</Label>
          <Select
            onValueChange={(value) => setForm({ ...form, category: value })}
            value={form.category}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat._id} value={cat._id}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Tag</Label>
          <Input
            value={form.tag}
            onChange={(e) => setForm({ ...form, tag: e.target.value })}
          />

          <Button className="mt-2" onClick={() => handleSave("POST")}>
            {"Add Navbar Info"}
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NavbarPage;
