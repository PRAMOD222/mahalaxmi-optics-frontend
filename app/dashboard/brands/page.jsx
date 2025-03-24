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
import { Label } from "@/components/ui/label";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Brands = () => {
  const [brand, setBrand] = useState({
    name: "",
    description: "",
    logo: null,
    banner_image: null,
  });
  const [brands, setBrands] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [addBrandOpen, setAddBrandOpen] = useState(false);
  const [token, setToken] = useState();
  

  useEffect(()=>{
    setToken(localStorage.getItem("token"))
  },[])

  const fetchBrands = async () => {
    try {
      const response = await fetch(`${baseApi}/brands`);
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrand((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    
    const { name, files } = e.target;
    setBrand((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleEdit = (brand) => {
    setBrand({
      _id: brand._id,
      name: brand.name,
      description: brand.description,
      logo: brand.logo,
      banner_image: brand.banner_image,
    });
    setIsEditMode(true);
    setAddBrandOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", brand.name);
    formData.append("description", brand.description);
    if (brand.logo) formData.append("logo", brand.logo);
    if (brand.banner_image) formData.append("banner_image", brand.banner_image);

    console.log(brand);
    

    try {
      if (isEditMode) {
        await fetch(`${baseApi}/brands/${brand._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
        toast.success("Brand updated!");
      } else {
        await axios.post(`${baseApi}/brands`, formData, {
          headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
        });
        toast.success("Brand added!");
      }
      fetchBrands();
      setAddBrandOpen(false);
    } catch (error) {
      toast.error("Error saving brand");
    }
  };

  const handleDelete = async (brandId) => {
    if (!confirm("Are you sure you want to delete this brand?")) return;
    try {
      await fetch(`${baseApi}/brands/${brandId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Brand deleted!");
      fetchBrands();
    } catch (error) {
      toast.error("Error deleting brand");
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => setAddBrandOpen(true)} className="bg-blue-500 text-white">
        Add Brand
      </Button>
      <Dialog open={addBrandOpen} onOpenChange={setAddBrandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Brand" : "Add Brand"}</DialogTitle>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-2">
              <Input type="text" name="name" value={brand.name.replace(/[^a-zA-Z0-9 ]/g, '')} onChange={handleChange} placeholder="Brand Name" required />
              <Textarea name="description" value={brand.description} onChange={handleChange} placeholder="Description" required />
              <Label>
                Logo
                <Input type="file" name="logo" onChange={handleFileChange} required={!isEditMode} />
              </Label>  
              <Label>
                Banner Image
                <Input type="file" name="banner_image" onChange={handleFileChange} required={!isEditMode} />
              </Label>
              
              <Button type="submit" className="bg-blue-500 text-white">
                {isEditMode ? "Update Brand" : "Add Brand"}
              </Button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {brands.map((brand) => (
          <div key={brand._id} className="border rounded p-4">
            <Image src={`${baseApi}${brand.logo}`} alt={brand.name} width={100} height={100} className="aspect-square w-full object-cover" />
            <h2 className="text-lg font-semibold mt-2">{brand.name}</h2>
            <p className="text-gray-600">{brand.description}</p>
            <div className="mt-4 flex space-x-2">
              <Button onClick={() => handleEdit(brand)} className="bg-yellow-500 text-white">Edit</Button>
              <Button onClick={() => handleDelete(brand._id)} className="bg-red-500 text-white">Delete</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
