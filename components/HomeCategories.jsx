"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import ReviewStars from "@/components/ReviewStars";
import ProductImages from "@/components/products/ProductImages";
import ProductButtons from "@/components/products/ProductButtons";
import ProductColors from "./products/ProductColors";



const baseApi = process.env.NEXT_PUBLIC_BASE_API


export default function HomeCategories() {
    const [active, setActive] = useState("Best Sellers");
    const [currentPage, setCurrentPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [productsInfo, setProductsInfo] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${baseApi}/categories/`); // Wait for response
            const data = await response.json(); // Wait for JSON parsing
            setCategories(data);
            setActive(data[0].name);
            fetchProducts(data[0].name);
            console.log("Categories fetched:", data);
        } catch (error) {
            console.log("Error fetching categories:", error);
        }
    };

    const fetchProducts = async (category) => {
        try {
            const response = await fetch(`${baseApi}/products/getProductsByCategory/${category}?offset=${(currentPage-1)*4}`); // Wait for response
            const data = await response.json(); // Wait for JSON parsing
            setProductsInfo(data);
            console.log("Products fetched:", data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };
    useEffect(()=>{
        setCurrentPage(1);
    },[active])
    useEffect(() => {
        fetchProducts(active);
    }, [active, currentPage]);


    useEffect(() => {
        fetchCategories();
    }, []);

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(productsInfo.totalPages, currentPage + 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    const onPageChange = () => {
        if (currentPage < productsInfo.totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const formatSlug = (name) => name.toLowerCase().replace(/ /g, '-');

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
          {productsInfo.products?.map((product) => (
            <div
              key={product._id}
              className=" text-center flex flex-col justify-between"
            >
              <div className=" border border-[#763f98] flex flex-col justify-between">
                <Link
                  href={`/product/${formatSlug(product.name)}`}
                  className="flex-1 w-full aspect-[5/4] flex items-center justify-center overflow-hidden"
                >
                  {product.thumbnail && (
                    <Image
                      src={`${baseApi}${product.thumbnail}`}
                      width={150}
                      height={150}
                      alt={product.name}
                      className="w-full object-contain"
                    />
                  )}
                </Link>

                <Dialog>
                  <DialogTrigger>
                    <h2 className="bg-[#515151] text-white w-full text-sm md:text-xl py-2 md:py-4">
                      QUICK VIEW
                    </h2>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="w-full md:w-1/2">
                        <ProductImages product={product} />
                      </div>

                      <div className="flex flex-col w-full md:w-1/2 space-y-2">
                        <div>
                          <ReviewStars rating={4.5} /> 10 Reviews
                        </div>

                        <h1 className="text-xl md:text-4xl font-bold text-gray-900">
                          {product.name}
                        </h1>
                        <p className="text-gray-500 text-sm">
                          Code: {product.code}
                        </p>

                        <div className="flex items-center gap-4">
                          <p className="text-4xl font-bold text-[#0071E3]">
                            ₹{product.price}
                          </p>

                          {product.discounted_price && (
                            <p className="text-lg line-through text-gray-400">
                              ₹{product.discounted_price}
                            </p>
                          )}
                        </div>

                        <p className="text-gray-500 text-sm">
                          Tax included. Shipping calculated at checkout.
                        </p>

                        {product.colors && product.colors.length > 0 && (
                          <ProductColors product={product} />
                        )}

                        <div className="space-y-4">
                          <p className="text-gray-600 font-semibold">
                            {" "}
                            <span className="font-[1000]">Ideal For: </span>
                            {product.ideal_for}
                          </p>
                        </div>

                        {/*information*/}
                        <div className="flex flex-wrap gap-3">
                          <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                            Material: {product.information.material}
                          </p>
                          <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                            Lens Size: {product.information.lens_size}
                          </p>
                          <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                            Nose Bridge Length:{" "}
                            {product.information.nose_bridge_length}
                          </p>
                          <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                            Temple Length: {product.information.temple_length}
                          </p>
                        </div>

                        <div className="">
                          <ProductButtons product={product} />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <p className="text-[#763f98] font-semibold mt-2">
                {product.name}
              </p>
              {product.discounted_price && (
                <p className="text-gray-500 text-sm line-through">
                  Rs {product.discounted_price} /-
                </p>
              )}
              <p className="text-xl font-bold">Rs {product.price} /-</p>
              {/* <p className="text-sm text-[#763f98]">AVAILABLE IN <br /> {product.colors.length} COLORS</p> */}
              <p className="text-sm text-[#763f98]">
                AVAILABLE IN <br /> {product.variants?.length || 0} COLORS
              </p>
              <Link
                href={`/product/${formatSlug(product.name)}`}
                className="mt-3 bg-[#763f98] text-white px-4 py-2  text-sm md:text-base xl:text-xl font-semibold block"
              >
                GRAB NOW!
              </Link>
            </div>
          ))}
        </motion.div>

        <section className="flex items-center justify-center mt-8">
          <div className="flex items-center space-x-2">
            {/* Previous Button */}
            <Button
              variant="outline"
              className="px-4 py-2"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              &lt; Previous
            </Button>

            {/* Page Numbers */}
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

            {/* Ellipsis if more pages exist */}
            {currentPage < productsInfo.totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}

            {/* Next Button */}
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
