"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-hot-toast"; // For success/error messages
import { Checkbox2 } from "@/components/ui/checkbox2";
import { ArrowLeft, CrossIcon } from "lucide-react";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const AddUpdateLandingPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const isUpdate = slug !== "add";

  const [formData, setFormData] = useState({
    thumbnail_title: "",
    link: "",
    linkText: "",
    banner_title: "",
    description: "",
    isVisible: false,
    products: [],
  });
  const [products, setProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [banner, setBanner] = useState(null);
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseApi}/products`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products");
      }
    };
    fetchProducts();

    if (isUpdate) {
      setIsLoading(true);
      fetch(`${baseApi}/landingpage/${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data.data,
            products: data.data.products.map((p) => p._id),
          });
        })
        .catch((error) => {
          console.error("Error fetching landing page data:", error);
          toast.error("Failed to fetch landing page data");
        })
        .finally(() => setIsLoading(false));
    }
  }, [isUpdate, slug]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e, field) => {
    if (field === "thumbnail") setThumbnail(e.target.files[0]);
    if (field === "banner") setBanner(e.target.files[0]);
  };

  const handleProductSelect = (productId) => {
    setFormData((prev) => {
      const currentProducts = [...prev.products];
      if (currentProducts.includes(productId)) {
        return {
          ...prev,
          products: currentProducts.filter((id) => id !== productId),
        };
      } else {
        return { ...prev, products: [...currentProducts, productId] };
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "products") {
        form.append(key, JSON.stringify(formData[key]));
      } else {
        form.append(key, formData[key]);
      }
    });
    if (thumbnail) form.append("thumbnail", thumbnail);
    if (banner) form.append("banner", banner);

    try {
      const response = await fetch(
        `${baseApi}/landingpage/${isUpdate ? slug : ""}`,
        {
          method: isUpdate ? "PUT" : "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: form,
        }
      );
      if (!response.ok) throw new Error("Failed to save landing page");
      toast.success(
        `Landing page ${isUpdate ? "updated" : "added"} successfully!`
      );
      router.push("/dashboard/landingpage");
      await fetch("/api/revalidate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: "/" }),
    });
    } catch (error) {
      console.error("Error saving landing page:", error);
      toast.error("Failed to save landing page");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Button variant="outline" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back
      </Button>
      <h1 className="text-2xl font-semibold mb-6">
        {isUpdate ? "Update" : "Add"} Landing Page
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Thumbnail Details</h2>
          <div>
            <Label>Thumbnail Title</Label>
            <Input
              name="thumbnail_title"
              value={formData.thumbnail_title}
              onChange={handleChange}
              placeholder="Enter thumbnail title"
              required
            />
          </div>
          <div>
            <Label>Thumbnail Image</Label>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, "thumbnail")}
              accept="image/*"
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Link Details</h2>
          <div>
            <Label>Link URL</Label>
            <Input
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Enter link URL"
              required
            />
          </div>
          <div>
            <Label>Link Text</Label>
            <Input
              name="linkText"
              value={formData.linkText}
              onChange={handleChange}
              placeholder="Enter link text"
              required
            />
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Banner Details</h2>
          <div>
            <Label>Banner Title</Label>
            <Input
              name="banner_title"
              value={formData.banner_title}
              onChange={handleChange}
              placeholder="Enter banner title"
              required
            />
          </div>
          <div>
            <Label>Banner Image</Label>
            <Input
              type="file"
              onChange={(e) => handleFileChange(e, "banner")}
              accept="image/*"
            />
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description"
            required
          />
        </div>

        <div className=" shadow-sm inset-shadow-xl p-2">
          <Label className="text-2xl">Select Products</Label>
          <div className="grid grid-cols-2 gap-4 mt-2 p-2">
            {products.map((product) => {
              const selectedIndex = formData.products.indexOf(product._id);
              return (
                <div key={product._id} className="flex items-center">
                  <Checkbox2
                    index={selectedIndex}
                    checked={selectedIndex !== -1}
                    onCheckedChange={() => handleProductSelect(product._id)}
                  />
                  <span className="ml-2">{product.name}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            name="isVisible"
            checked={formData.isVisible}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isVisible: checked }))
            }
          />
          <Label>Make Landing Page Visible</Label>
        </div>

        <Button
          type="submit"
          className="w-full max-w-xs bg-[#763f98] hover:bg-[#a373c1]"
          disabled={isLoading}
        >
          {isLoading
            ? "Loading..."
            : isUpdate
            ? "Update Landing Page"
            : "Add Landing Page"}
        </Button>
      </form>
    </div>
  );
};

export default AddUpdateLandingPage;
