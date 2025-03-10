"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CrossIcon } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@mui/material";
import ImageCropper from "@/components/cropper/ImageCropper";
import { MdCancel } from "react-icons/md";

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
    discounted_price: "",
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
      temple_color: "",
      lens_color: "",
      style_tip: "",
    },
    stock: "",
    isOptical: false,
  });
  const [selectedColor, setSelectedColor] = useState(null);
  const [newColor, setNewColor] = useState({ color_name: "", color_code: "" });
  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const idealForOptions = ["Men", "Women", "Unisex"];
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);

  const colorInputRef = useRef(null);

  const token = localStorage.getItem("token");

  const shapes = [
    "angular",
    "aviator",
    "cat-eye",
    "clubmaster",
    "round",
    "oval",
    "rectangle",
    "wayfarer",
    "square",
  ];

  useEffect(() => {
    if (!product?.colors || product.colors.length === 0) return;

    const saveColors = async () => {
      try {
        const response = await fetch(`${baseApi}/products/colors`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
        const response = await fetch(`${baseApi}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
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
      const response = await fetch(`${baseApi}/products/${slug}`);
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

      e.target.value = "";
    }
  };

  const handleRemoveImage = (colorName, imageIndex) => {
    const newImages = { ...product.images };
    if (newImages[colorName]) {
      newImages[colorName].splice(imageIndex, 1);
      setProduct({ ...product, images: newImages });
    }
  };

  const handleAddColor = () => {
    // check if color with same is already added
    if (
      product.colors.some((color) => color.color_name === newColor.color_name)
    )
      return;
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
        ? await fetch(`${baseApi}/products`, {
            method: "POST",
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
        : await fetch(`${baseApi}/products/${slug}`, {
            method: "PUT",
            headers: {
              // "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // router.back();
      } else {
        console.error("Backend Error:", data); // Log the error details
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
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
            <div className="col-span-1">
              <Label>Name</Label>
              <Input
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full"
                required
              />
            </div>
            <div className="col-span-1">
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
            <div className="col-span-1">
              <Label>Type</Label>
              <Input
                name="type"
                value={product.type}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <Label>Ideal For</Label>
              {/* <Input
                name="ideal_for"
                value={product.ideal_for}
                onChange={handleChange}
                className="w-full"
              /> */}
              <select
                name="ideal_for"
                value={product.ideal_for}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Ideal For</option>
                {idealForOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
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
            <div className="col-span-1">
              <Label>Brand</Label>
              <input
                type="text"
                list="brand-options"
                name="brand"
                value={product?.brand?.name || searchValue} // Allows free typing
                onChange={(e) => {
                  setSearchValue(e.target.value); // Update UI immediately
                  const selectedBrand = brands.find(
                    (brand) => brand.name === e.target.value
                  );
                  if (selectedBrand) {
                    handleChange({
                      target: { name: "brand", value: selectedBrand._id },
                    });
                  }
                }}
                className="w-full p-2 border rounded"
                placeholder="Search Brand..."
              />
              <datalist id="brand-options">
                {brands.map((brand) => (
                  <option key={brand._id} value={brand.name} />
                ))}
              </datalist>
            </div>

            <div className="col-span-1">
              <Label>Price</Label>
              <Input
                name="price"
                type="number"
                value={product.price}
                onChange={handleChange}
                className="w-full"
              />

              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isDiscountEnabled}
                  onChange={(e) => setIsDiscountEnabled(e.target.checked)}
                  className="w-4 h-4"
                />
                <span>Enable Discounted Price</span>
              </label>
            </div>
            <div className="col-span-1">
              {isDiscountEnabled && (
                <>
                  <Label>Discounted Price</Label>
                  <Input
                    name="discounted_price"
                    type="number"
                    value={product.discounted_price}
                    onChange={handleChange}
                    className="w-full"
                  />
                </>
              )}
            </div>
            <div className="col-span-1">
              <Label>Warranty</Label>
              <Input
                name="warranty"
                value={product.warranty}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div className="col-span-1">
              <Label>Optical/Glasses</Label>
              <Select
                value={product.isOptical ? "Optical" : "Glasses"}
                onValueChange={(value) => {
                  setProduct((prev) => ({
                    ...prev,
                    isOptical: value === "Optical",
                  }));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Optical">Optical</SelectItem>
                  <SelectItem value="Glasses">Glasses</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2">
              <Label>Colors</Label>
              <div className="flex flex-col flex-wrap gap-2">
                <div className="flex h-fit gap-2">
                  <Input
                    type="text"
                    placeholder="Color Name"
                    value={newColor.color_name}
                    onChange={(e) =>
                      setNewColor({ ...newColor, color_name: e.target.value })
                    }
                    className="w-fit"
                  />
                  {/* <Input
                    type="color"
                    value={newColor.color_code}
                    onChange={(e) =>
                      setNewColor({ ...newColor, color_code: e.target.value })
                    }
                    className="w-16 h-10 rounded-md border-none p-0 cursor-pointer bg-transparent outline-none overflow-hidden"
                  /> */}

                  <div className="relative">
                    <div className="w-16 h-full border-2 border-gray-200 rounded-md cursor-pointer relative p-1">
                      <div
                        className="w-full h-full rounded"
                        style={{ backgroundColor: newColor.color_code }}
                        onClick={() => colorInputRef.current.click()}
                      ></div>
                    </div>

                    <input
                      type="color"
                      ref={colorInputRef}
                      value={newColor.color_code}
                      onChange={(e) =>
                        setNewColor({ ...newColor, color_code: e.target.value })
                      }
                      className="absolute top-0 left-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color.color_name + color.color_code}
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => setSelectedColor(color)}
                    >
                      <div
                        className={`w-8 h-8 rounded-full border-2  ${
                          selectedColor?.color_code == color.color_code
                            ? " border-black "
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.color_code }}
                      />
                      <span className="text-sm">{color.color_name}</span>
                    </div>
                  ))}
                  <div
                    onClick={handleAddColor}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer"
                  >
                    +
                  </div>
                </div>
              </div>
            </div>
            {selectedColor && (
              <div className="col-span-2 ">
                <div className="flex items-center">
                  <Label className="text-lg font-semibold">
                    Images for {selectedColor.color_name}
                  </Label>
                  <ImageCropper handleImageChange={handleImageChange} />
                </div>

                {/* <Input
                  type="file"
                  multiple
                  onChange={handleImageChange}
                  className="w-full"
                /> */}
                {/* <button
                  type="button"
                  onClick={handleButtonClick}
                  className="px-3 mx-2 py-1 my-4 bg-[#763f98] text-white rounded-md"
                >
                  Add Images
                </button> */}
                {/* <input
                  type="file"
                  multiple
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                /> */}

                <div className="flex flex-wrap gap-2 mt-2 p-2">
                  {product.images[selectedColor.color_name]?.map(
                    (image, index) => {
                      const imageUrl =
                        typeof image === "string"
                          ? `${baseApi}${image}`
                          : URL.createObjectURL(image);
                      return (
                        <div className="relative">
                          <Image
                            key={index}
                            src={imageUrl}
                            width={400}
                            height={400}
                            alt={`Product Preview ${index}`}
                            className="rounded-md shadow-md w-48 h-48 object-cover"
                          />
                          <button
                            className="absolute top-0 right-0 text-2xl"
                            onClick={() =>
                              handleRemoveImage(selectedColor.color_name, index)
                            }
                          >
                            <MdCancel />
                          </button>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
            <div className="col-span-2 bg-black h-[1px] w-full"></div>
            <div className="col-span-2 p-2">
              <h3 className="text-lg font-semibold mb-4">
                Product Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Lens Size</Label>
                  <Input
                    name="lens_size"
                    value={product.information.lens_size}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          lens_size: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Nose Bridge Length</Label>
                  <Input
                    name="nose_bridge_length"
                    value={product.information.nose_bridge_length}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          nose_bridge_length: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Temple Length</Label>
                  <Input
                    name="temple_length"
                    value={product.information.temple_length}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          temple_length: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Material</Label>
                  <Input
                    name="material"
                    value={product.information.material}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          material: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Shape</Label>

                  <Select>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {shapes.map((shape) => (
                        <SelectItem
                          key={shape}
                          value={shape}
                          onClick={() =>
                            setProduct({
                              ...product,
                              information: {
                                ...product.information,
                                shape: shape,
                              },
                            })
                          }
                        >
                          {shape}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Country of Origin</Label>
                  <Input
                    name="country_of_origin"
                    value={product.information.country_of_origin}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          country_of_origin: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Front Color</Label>
                  <Input
                    name="front_color"
                    value={product.information.front_color}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          front_color: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Temple Color</Label>
                  <Input
                    name="temple_color"
                    value={product.information.temple_color}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          temple_color: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Lens Color</Label>
                  <Input
                    name="lens_color"
                    value={product.information.lens_color}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          lens_color: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Style Tip</Label>
                  <Input
                    name="style_tip"
                    value={product.information.style_tip}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          style_tip: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <Button
                type="submit"
                className="w-full max-w-xs bg-[#763f98] hover:bg-[#a373c1]"
              >
                {isNew ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
