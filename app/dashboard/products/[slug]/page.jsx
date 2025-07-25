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
import ProductImageCropper from "@/components/cropper/ProductImageCropper";
import { MdCancel } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { CgColorPicker } from "react-icons/cg";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

export default function ProductPage() {
  const { slug } = useParams();
  const router = useRouter();
  const [isNew, setIsNew] = useState(true);
  const [product, setProduct] = useState({
    name: "",
    code: "",
    description: "",
    ideal_for: "",
    category: "",
    brand: "",
    price: "",
    discounted_price: "",
    warranty: "",
    //stock: "",
    isOptical: false,
    variants: [],
    information: {
      lens_size: "",
      nose_bridge_length: "",
      temple_length: "",
      material: "",
      lens_material: "",
      shape: "",
      country_of_origin: "",
      // front_color: "",
      // temple_color: "",
      // lens_color: "",
      style_tip: "",
    },
  });

  const [newVariant, setNewVariant] = useState({
    color_name: "",
    color_code: "#000000",
    lens_color: "",
    front_color: "",
    temple_color: "",
    stock: 0,
    images: [],
  });

  const [searchValue, setSearchValue] = useState("");

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const idealForOptions = ["Men", "Women", "Unisex", "Kids"];
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);

  const colorInputRef = useRef(null);
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

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

  // useEffect(() => {
  //   if (!product?.colors || product.colors.length === 0) return;

  //   const saveColors = async () => {
  //     try {
  //       const response = await fetch(`${baseApi}/products/colors`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },

  //         body: JSON.stringify({ colors: product.colors }),
  //       });

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }

  //       console.log("✅ Colors saved:", product.colors);
  //     } catch (error) {
  //       console.error("❌ Error saving colors:", error);
  //     }
  //   };

  //   saveColors();
  // }, [product.colors]);

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
      const res = await fetch(`${baseApi}/products/${slug}`);
      const data = await res.json();

      // Normalize category and brand to _id strings for form
      const normalizedProduct = {
        ...data,
        category: data.category?._id || "",
        brand: data.brand?._id || "",
      };

      setProduct(normalizedProduct);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  //variant handler
  const handleAddVariant = () => {
    if (!newVariant.color_name) return;

    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
    setNewVariant({
      color_name: "",
      color_code: "#000000",
      lens_color: "",
      front_color: "",
      temple_color: "",
      stock: 0,
      images: [],
    });
  };

  const updateVariantField = (index, field, value) => {
    setProduct((prev) => {
      const updatedVariants = [...prev.variants];
      updatedVariants[index][field] = value;
      return { ...prev, variants: updatedVariants };
    });
  };

  //image handler for variant
  const handleVariantImageChange = (e, colorName) => {
    const files = Array.from(e.target.files);
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) =>
        variant.color_name === colorName
          ? { ...variant, images: [...(variant.images || []), ...files] }
          : variant
      ),
    }));
    e.target.value = "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleRemoveImage = (colorName, imageIndex) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant) => {
        if (variant.color_name === colorName) {
          const updatedImages = [...variant.images];
          updatedImages.splice(imageIndex, 1);
          return { ...variant, images: updatedImages };
        }
        return variant;
      }),
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!product || typeof product !== "object") {
  //     alert("Product data is missing.");
  //     return;
  //   }

  //   const formData = new FormData();

  //   // Append scalar (non-object) fields
  //   Object.keys(product).forEach((key) => {
  //     if (
  //       key !== "variants" &&
  //       key !== "information" &&
  //       typeof product[key] !== "object"
  //     ) {
  //       formData.append(key, product[key]);
  //     }
  //   });

  //   // Append structured fields
  //   formData.append("information", JSON.stringify(product.information));
  //   formData.append("variants", JSON.stringify(product.variants));

  //   // Append images per variant
  //   product.variants.forEach((variant) => {
  //     (variant.images || []).forEach((file) => {
  //       formData.append(`images_${variant.color_name}`, file);
  //     });
  //   });

  //   // Optional: log for debugging
  //   for (let [key, value] of formData.entries()) {
  //     console.log(key, value);
  //   }

  //   try {
  //     const response = isNew
  //       ? await fetch(`${baseApi}/products`, {
  //           method: "POST",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: formData,
  //         })
  //       : await fetch(`${baseApi}/products/${slug}`, {
  //           method: "PUT",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //           body: formData,
  //         });

  //     const data = await response.json();

  //     if (response.ok) {
  //       alert(data.message);
  //       await fetch("/api/revalidate", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ path: "/" }),
  //       });
  //       router.back();
  //     } else {
  //       console.error("Backend Error:", data);
  //       alert("Error: " + (data.error || "Unknown error"));
  //     }
  //   } catch (error) {
  //     alert("Error: " + error.message);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product || typeof product !== "object") {
      alert("Product data is missing.");
      return;
    }

    const formData = new FormData();

    // Append scalar (non-object) fields
    Object.keys(product).forEach((key) => {
      if (
        key !== "variants" &&
        key !== "information" &&
        typeof product[key] !== "object"
      ) {
        formData.append(key, product[key]);
      }
    });

    // Append structured fields
    formData.append("information", JSON.stringify(product.information));
    formData.append("variants", JSON.stringify(product.variants));

    // Append retained + new images per variant
    product.variants.forEach((variant) => {
      const key = `images_${variant.color_name}`;
      const retained = (variant.images || []).filter(
        (img) => typeof img === "string"
      );
      const uploaded = (variant.images || []).filter(
        (img) => img instanceof File
      );

      if (retained.length > 0) {
        formData.append(key, JSON.stringify(retained));
      }

      uploaded.forEach((file) => {
        formData.append(key, file);
      });
    });

    // Debugging
    for (let [key, value] of formData.entries()) {
      console.log("🧾 FormData:", key, value);
    }

    try {
      const response = isNew
        ? await fetch(`${baseApi}/products`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          })
        : await fetch(`${baseApi}/products/${slug}`, {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        await fetch("/api/revalidate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: "/" }),
        });
        router.back();
      } else {
        console.error("Backend Error:", data);
        alert("Error: " + (data.error || "Unknown error"));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleShapeChange = (value) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      information: {
        ...prevProduct.information,
        shape: value, // Directly use the value
      },
    }));
  };

  const handleRemoveColor = (color) => {
    const newColors = product.colors.filter(
      (c) => c.color_name !== color.color_name
    );
    setProduct({ ...product, colors: newColors });
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
          <div
            // onSubmit={handleSubmit}
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
            <div className="col-span-2">
              <Label>Brand</Label>
              <Select
                value={product?.brand || ""}
                onValueChange={(value) =>
                  handleChange({ target: { name: "brand", value } })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands.map((brand) => (
                    <SelectItem key={brand._id} value={brand._id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="col-span-1">
              <Label>Stock</Label>
              <Input
                name="stock"
                type="number"
                value={product.stock}
                onChange={handleChange}
                className="w-full"
              />
            </div> */}

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
            {/* Colors and image*/}
            <div className="col-span-1 w-1/2">
              <Label className="text-lg font-semibold pb-8">
                Add Colors and Images
              </Label>
              <Card className="pl-0">
                <CardContent className="flex flex-col gap-2 p-2">
                  <div className="flex gap-2 items-center">
                    <Label className="w-1/2">Color</Label>
                    <div className="relative flex items-center w-full">
                      <div className="flex items-center gap-2 w-fit h-fit border-2 border-gray-200 rounded-md cursor-pointer relative p-1">
                        <div
                          className="flex items-center justify-center w-8 h-8 rounded"
                          style={{ backgroundColor: newVariant.color_code }}
                          onClick={() => colorInputRef.current.click()}
                        ></div>
                        <CgColorPicker className="text-black text-xl" />
                      </div>

                      <input
                        type="color"
                        ref={colorInputRef}
                        value={newVariant.color_code}
                        onChange={(e) =>
                          setNewVariant({
                            ...newVariant,
                            color_code: e.target.value,
                          })
                        }
                        className="absolute w-1/2 top-0 left-0 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Label className="w-1/2">Color Name</Label>
                    <Input
                      type="text"
                      placeholder="Color Name"
                      value={newVariant.color_name}
                      onChange={(e) =>
                        setNewVariant({
                          ...newVariant,
                          color_name: e.target.value,
                        })
                      }
                      className="w-full"
                    />
                  </div>
                  {/* <Button onClick={handleAddColor}>Add +</Button> */}
                  <Button onClick={handleAddVariant}>Add +</Button>
                </CardContent>
              </Card>

              {/* <div className="flex flex-col flex-wrap gap-2">
                <div className="flex h-fit gap-2">
                   <Input
                    type="text"
                    placeholder="Color Name"
                    value={newColor.color_name}
                    onChange={(e) =>
                      setNewColor({ ...newColor, color_name: e.target.value })
                    }
                    className="w-fit"
                  /> <div className="relative">
                    <div className="w-16 h-full border-2 border-gray-200 rounded-md cursor-pointer relative p-1">
                      <div
                        className="flex items-center justify-center w-full h-full rounded"
                        style={{ backgroundColor: newColor.color_code }}
                        onClick={() => colorInputRef.current.click()}
                      >
                        <CgColorPicker className="text-white text-md" />
                      </div>
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
              </div> */}
            </div>
            <div className="col-span-2 w-full">
              <div className="grid grid-cols-3 py-2 gap-2">
                {product.variants.map((variant, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="flex gap-4 items-center">
                        <div
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: variant.color_code }}
                        />
                        <span className="font-semibold capitalize">
                          {variant.color_name}
                        </span>
                      </div>
                      <Input
                        placeholder="Lens Color"
                        value={variant.lens_color}
                        onChange={(e) =>
                          updateVariantField(idx, "lens_color", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Front Color"
                        value={variant.front_color}
                        onChange={(e) =>
                          updateVariantField(idx, "front_color", e.target.value)
                        }
                      />
                      <Input
                        placeholder="Temple Color"
                        value={variant.temple_color}
                        onChange={(e) =>
                          updateVariantField(
                            idx,
                            "temple_color",
                            e.target.value
                          )
                        }
                      />
                      <Input
                        type="number"
                        placeholder="Stock"
                        value={variant.stock}
                        onChange={(e) =>
                          updateVariantField(
                            idx,
                            "stock",
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <Input
                        type="file"
                        multiple
                        onChange={(e) =>
                          handleVariantImageChange(e, variant.color_name)
                        }
                      />
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {variant.images?.map((img, i) => {
                          let src = "";
                          if (typeof img === "string") {
                            src = img.startsWith("/uploads")
                              ? `${baseApi}${img}`
                              : img;
                          } else if (img instanceof File) {
                            src = URL.createObjectURL(img);
                          }

                          return (
                            <div key={i} className="relative w-fit">
                              <Image
                                src={src}
                                width={100}
                                height={100}
                                alt="Variant Img"
                                className="rounded-md object-cover"
                              />

                              <Button
                                onClick={() =>
                                  handleRemoveImage(variant.color_name, i)
                                }
                                className="absolute -top-1 -right-1 bg-white rounded-full p-1 text-red-600 shadow-md"
                              >
                                <MdCancel size={18} />
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                ;
              </div>
            </div>

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
                  <Label>Lens Material</Label>
                  <Input
                    name="lens_material"
                    value={product.information.lens_material}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        information: {
                          ...product.information,
                          lens_material: e.target.value,
                        },
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div>
                  <Label>Shape</Label>

                  <Select onValueChange={handleShapeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {shapes.map((shape) => (
                        <SelectItem key={shape} value={shape}>
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

                {/* <div>
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
                </div> */}

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
                onClick={handleSubmit}
                className="w-full max-w-xs bg-[#763f98] hover:bg-[#a373c1]"
              >
                {isNew ? "Add Product" : "Update Product"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
