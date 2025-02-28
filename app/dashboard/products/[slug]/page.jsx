"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [isNew, setIsNew] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    code: "",
    description: "",
    type: "",
    ideal_for: "",
    category: "",
    brand: "",
    price: "",
    warranty: "",
    colors: [],
    images: {},
    information: {
      lens_size: "",
      nose_bridge_length: "",
      temple_length: "",
      material: "",
      shape: "",
      country_of_origin: "",
      front_color: "",
    },
    stock: "",
  });
  const [productImage, setProductImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [newColor, setNewColor] = useState({ color_name: "", color_code: "" });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    if (!product?.colors || product.colors.length === 0) return;

    const saveColors = async () => {
      try {
        const response = await fetch(`${baseApi}/api/products/colors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ colors: product.colors }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log("✅ Colors saved:", product.colors);
      } catch (error) {
        console.error("❌ Error saving colors:", error);
      }
    };

    saveColors();
  }, [product.colors]);

  // Fetch categories and brands
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseApi}/api/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await fetch(`${baseApi}/api/brands`);
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchCategories();
    fetchBrands();
  }, []);

  // Fetch product data if editing
  useEffect(() => {
    if (slug === "add-product") {
      setIsNew(true);
    } else {
      setIsNew(false);
      fetchProductById();
    }
  }, [slug]);

  const fetchProductById = async () => {
    try {
      const response = await fetch(`${baseApi}/api/products/${slug}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    if (selectedColor) {
      const newImages = { ...product.images };
      if (!newImages[selectedColor.color_name]) {
        newImages[selectedColor.color_name] = [];
      }
      newImages[selectedColor.color_name].push(...Array.from(e.target.files));
      setProduct({ ...product, images: newImages });
    }
  };

  const handleAddColor = () => {
    if (newColor.color_name && newColor.color_code) {
      const newColors = [...product.colors, newColor];
      setProduct({ ...product, colors: newColors });
      setNewColor({ color_name: "", color_code: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append non-image fields
    Object.keys(product).forEach((key) => {
      if (
        key !== "colors" &&
        key !== "images" &&
        typeof product[key] !== "object"
      ) {
        formData.append(key, product[key]);
      } else if (key === "colors") {
        // Append colors as JSON
        formData.append(key, JSON.stringify(product[key]));
      } else if (key === "information") {
        // Append nested information object as JSON
        formData.append(key, JSON.stringify(product[key]));
      }
    });

    // Append images in the required format (images_Blue, images_Green, etc.)
    Object.keys(product.images).forEach((color) => {
      product.images[color].forEach((image, index) => {
        formData.append(`images_${color}`, image);
      });
    });

    // Log FormData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const response = isNew
        ? await fetch(`${baseApi}/api/products`, {
            method: "POST",
            body: formData,
          })
        : await fetch(`${baseApi}/api/products/${slug}`, {
            method: "PUT",
            body: formData,
          });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        router.back();
      } else {
        console.error("Backend Error:", data); // Log the error details
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            {isNew ? "Add Product" : "Edit Product"}
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Product Fields */}
            <div className="col-span-2">
              <Label>Name</Label>
              <Input
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Code</Label>
              <Input
                name="code"
                value={product.code}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Description</Label>
              <Textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Type</Label>
              <Input
                name="type"
                value={product.type}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Ideal For</Label>
              <Input
                name="ideal_for"
                value={product.ideal_for}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Category</Label>
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <Label>Brand</Label>
              <select
                name="brand"
                value={product.brand}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <Label>Price</Label>
              <Input
                name="price"
                value={product.price}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-2">
              <Label>Warranty</Label>
              <Input
                name="warranty"
                value={product.warranty}
                onChange={handleChange}
                className="w-full"
              />
            </div>

            {/* Colors Section */}
            <div className="col-span-2">
              <Label>Colors</Label>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div
                    key={color.color_name}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="w-8 h-8 rounded-full border-2 border-gray-300"
                      style={{ backgroundColor: color.color_code }}
                    />
                    <span className="text-sm">{color.color_name}</span>
                  </div>
                ))}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer">
                    +
                  </div>
                  <Input
                    type="text"
                    placeholder="Color Name"
                    value={newColor.color_name}
                    onChange={(e) =>
                      setNewColor({ ...newColor, color_name: e.target.value })
                    }
                    className="w-20"
                  />
                  <Input
                    type="color"
                    value={newColor.color_code}
                    onChange={(e) =>
                      setNewColor({ ...newColor, color_code: e.target.value })
                    }
                    className="w-20"
                  />
                  <Button type="button" onClick={handleAddColor}>
                    Add Color
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Upload for Selected Color */}
            {selectedColor && (
              <div className="col-span-2">
                <Label>Images for {selectedColor.color_name}</Label>
                <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {product.images[selectedColor.color_name]?.map(
                    (image, index) => {
                      // Check if the image is a URL (string) or a File object
                      const imageUrl =
                        typeof image === "string"
                          ? `${baseApi}/api${image}` // Prepend base URL to the image path
                          : URL.createObjectURL(image); // Handle File objects
                      return (
                        <div>
                          <Image
                            key={index}
                            src={imageUrl}
                            width={400}
                            height={400}
                            alt={`Product Preview ${index}`}
                            className="rounded-md w-32 h-32 object-cover"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="col-span-2">
              <Button type="submit" className="w-full">
                {isNew ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
