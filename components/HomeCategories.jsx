"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReviewStars from "@/components/ReviewStars";
import ProductButtons from "@/components/products/ProductButtons";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

export default function HomeCategories() {
  const [active, setActive] = useState("Best Sellers");
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [productsInfo, setProductsInfo] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState({});
  const [selectedImageIndex, setSelectedImageIndex] = useState({});

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${baseApi}/categories/`);
      const data = await response.json();
      setCategories(data);
      setActive(data[0].name);
      fetchProducts(data[0].name);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchProducts = async (category) => {
    try {
      const response = await fetch(
        `${baseApi}/products/getProductsByCategory/${category}?offset=${
          (currentPage - 1) * 4
        }`
      );
      const data = await response.json();
      setProductsInfo(data);
      console.log("Products fetched:", data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [active]);

  useEffect(() => {
    fetchProducts(active);
  }, [active, currentPage]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleVariantClick = (productId, index) => {
    setSelectedVariants((prev) => ({ ...prev, [productId]: index }));
    setSelectedImageIndex((prev) => ({ ...prev, [productId]: 0 }));
  };

  const formatSlug = (name) => name.toLowerCase().replace(/ /g, "-");

  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(productsInfo.totalPages, currentPage + 1);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="text-center py-10 mx-6 md:mx-32">
      <p className="text-sm uppercase tracking-widest text-gray-500">
        Make Your Style Perfect
      </p>
      <h2 className="text-3xl font-semibold text-purple-700 mt-2">
        Reframing The Eyewear Game
      </h2>

      {/* Category Tabs */}
      <div className="flex justify-center mt-6 gap-4">
        {categories.map((item) => (
          <motion.button
            key={item._id}
            onClick={() => setActive(item.name)}
            className={`flex items-center gap-2 px-5 py-2 rounded-md border-2 transition-all text-xs md:text-base ${
              active === item.name
                ? "bg-[#763f98] text-white border-[#763f98]"
                : "bg-gray-100 text-gray-700 border-gray-300"
            }`}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              width={18}
              height={18}
              alt="emoji"
              src={"/cool.svg"}
              className="hidden md:block"
            />
            {item.name}
          </motion.button>
        ))}
      </div>

      {/* Products */}
      <motion.div
        key={active}
        className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-x-[6.67%] md:gap-y-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {productsInfo.products?.map((product) => {
          const selectedIndex = selectedVariants[product._id] || 0;
          const variant = product.variants?.[selectedIndex];
          const images =
            variant?.images?.length > 0 ? variant.images : [product.thumbnail];
          const activeImage = selectedImageIndex[product._id] || 0;
          const variantImage = images[activeImage];
          return (
            <div
              key={product._id}
              className="text-center flex flex-col justify-between"
            >
              <div className="border border-[#763f98] flex flex-col justify-between">
                <Link
                  href={`/product/${formatSlug(product.name)}`}
                  className="flex-1 w-full aspect-[5/4] flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={`${baseApi}${variantImage}`}
                    width={150}
                    height={150}
                    alt={product.name}
                    className="w-full object-contain"
                  />
                </Link>

                <Dialog>
                  <DialogTrigger>
                    <h2 className="bg-[#515151] text-white w-full text-sm md:text-xl py-2 md:py-4">
                      QUICK VIEW
                    </h2>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>{product.name}</DialogTitle>
                    <div className="flex flex-col md:flex-row gap-8">
                      {/* Updated Image with Thumbnails */}
                      <div className="flex gap-3">
                        {/* Thumbnails */}
                        <div className="flex flex-col gap-2">
                          {images.map((img, idx) => (
                            <div
                              key={idx}
                              className={`relative w-16 h-16 border rounded cursor-pointer overflow-hidden ${
                                activeImage === idx
                                  ? "ring-2 ring-[#763f98]"
                                  : ""
                              }`}
                              onClick={() =>
                                setSelectedImageIndex((prev) => ({
                                  ...prev,
                                  [product._id]: idx,
                                }))
                              }
                            >
                              <Image
                                src={`${baseApi}${img}`}
                                alt={`Thumbnail ${idx + 1}`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          ))}
                        </div>

                        {/* Main Image */}
                        <div className="relative w-[280px] md:w-[350px] aspect-[5/4] border rounded overflow-hidden">
                          <Image
                            src={`${baseApi}${variantImage}`}
                            alt="Selected Variant"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-col w-full md:w-1/2 space-y-2">
                        <ReviewStars rating={4.5} /> <span>10 Reviews</span>
                        <h1 className="text-xl md:text-4xl font-bold text-gray-900">
                          {product.name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                          Code: {product.code}
                        </p>
                        {/* Variant Selector */}
                        {product.variants?.length > 0 && (
                          <div className="flex flex-wrap gap-4 mt-2">
                            {product.variants.map((variant, index) => (
                              <button
                                key={index}
                                onClick={() =>
                                  handleVariantClick(product._id, index)
                                }
                                className={`flex items-center gap-2 px-2 py-1 rounded-full border ${
                                  selectedVariants[product._id] === index
                                    ? "border-[#763f98]"
                                    : "border-gray-300"
                                }`}
                              >
                                <div
                                  className="w-4 h-4 rounded-full"
                                  style={{
                                    backgroundColor: variant.color_code,
                                  }}
                                />
                                <span className="text-sm text-gray-700">
                                  {variant.color_name}
                                </span>
                              </button>
                            ))}
                          </div>
                        )}
                        {/* <div className="flex items-center gap-4">
                          <p className="text-4xl font-bold text-[#0071E3]">
                            ₹{product.price}
                          </p>
                          {product.discounted_price && (
                            <p className="text-lg line-through text-gray-400">
                              ₹{product.discounted_price}
                            </p>
                          )}
                        </div> */}
                        <div className="flex items-center gap-4">
                          {product.discounted_price ? (
                            <>
                              <p className="text-4xl font-bold text-[#0071E3]">
                                ₹{product.discounted_price}
                              </p>
                              <p className="text-lg line-through text-gray-400">
                                ₹{product.price}
                              </p>
                            </>
                          ) : (
                            <p className="text-4xl font-bold text-[#0071E3]">
                              ₹{product.price}
                            </p>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">
                          Tax included. Shipping calculated at checkout.
                        </p>
                        <p className="text-gray-600 font-semibold">
                          <span className="font-[1000]">Ideal For: </span>
                          {product.ideal_for}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <p className="text-[#763f98] text-sm font-[800] border border-[#763f98] rounded-full px-4 py-1">
                            Material: {product.information.material}
                          </p>
                          <p className="text-[#763f98] text-sm font-[800] border border-[#763f98] rounded-full px-4 py-1">
                            Lens Size: {product.information.lens_size}
                          </p>
                          <p className="text-[#763f98] text-sm font-[800] border border-[#763f98] rounded-full px-4 py-1">
                            Nose Bridge:{" "}
                            {product.information.nose_bridge_length}
                          </p>
                          <p className="text-[#763f98] text-sm font-[800] border border-[#763f98] rounded-full px-4 py-1">
                            Temple Length: {product.information.temple_length}
                          </p>
                        </div>
                        <ProductButtons product={product} />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <p className="text-[#763f98] font-semibold mt-2">
                {product.name}
              </p>
              {/* {product.discounted_price && (
                <p className="text-gray-500 text-sm line-through">
                  Rs {product.discounted_price} /-
                </p>
              )}
              <p className="text-xl font-bold">Rs {product.price} /-</p> */}
              {product.discounted_price ? (
                <>
                  <p className="text-xl font-bold">
                    Rs {product.discounted_price} /-
                  </p>
                  <p className="text-gray-500 text-sm line-through">
                    Rs {product.price} /-
                  </p>
                </>
              ) : (
                <p className="text-xl font-bold">Rs {product.price} /-</p>
              )}

              <p className="text-sm text-[#763f98]">
                AVAILABLE IN <br /> {product.variants?.length || 0} COLORS
              </p>

              <Link
                href={`/product/${product.slug}`}
                className="mt-3 bg-[#763f98] text-white px-4 py-2 text-sm md:text-base xl:text-xl font-semibold block"
              >
                GRAB NOW!
              </Link>
            </div>
          );
        })}
      </motion.div>

      {/* Pagination */}
      <section className="flex items-center justify-center mt-8">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="px-4 py-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &lt; Previous
          </Button>

          {pageNumbers.map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              className={cn(
                "w-10 h-10 transition-all duration-300",
                currentPage === page
                  ? "bg-[#763f98] text-white border border-[#763f98]"
                  : "border border-gray-300"
              )}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Button>
          ))}

          {currentPage < productsInfo.totalPages - 1 && (
            <span className="text-gray-400">...</span>
          )}

          <Button
            variant="outline"
            className="px-4 py-2"
            disabled={currentPage === productsInfo.totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next &gt;
          </Button>
        </div>
      </section>
    </div>
  );
}
