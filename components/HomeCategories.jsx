"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


// Dummy product data
// const categories = [
//     {
//         label: "Best Sellers",
//         emoji: "/cool.svg",
//         products: [
//             {
//                 id: 1,
//                 image: "/glass1.png",
//                 name: "Ray Ban RB 90102R",
//                 discount: "20% OFF",
//                 originalPrice: "₹22,153",
//                 price: "₹20,250",
//                 colors: 9,
//             },
//             {
//                 id: 2,
//                 image: "/glass2.png",
//                 name: "Oakley OO 9208",
//                 discount: "15% OFF",
//                 originalPrice: "₹18,000",
//                 price: "₹15,300",
//                 colors: 6,
//             },
//             {
//                 id: 3,
//                 image: "/glass3.png",
//                 name: "Gucci GG 0741S",
//                 discount: "25% OFF",
//                 originalPrice: "₹30,000",
//                 price: "₹22,500",
//                 colors: 5,
//             },
//             {
//                 id: 4,
//                 image: "/glass4.png",
//                 name: "Versace VE 4361",
//                 discount: "10% OFF",
//                 originalPrice: "₹25,000",
//                 price: "₹22,500",
//                 colors: 4,
//             },
//             {
//                 id: 5,
//                 image: "/glass1.png",
//                 name: "Ray Ban RB 90102R",
//                 discount: "20% OFF",
//                 originalPrice: "₹22,153",
//                 price: "₹20,250",
//                 colors: 9,
//             },
//             {
//                 id: 6,
//                 image: "/glass2.png",
//                 name: "Oakley OO 9208",
//                 discount: "15% OFF",
//                 originalPrice: "₹18,000",
//                 price: "₹15,300",
//                 colors: 6,
//             },
//             {
//                 id: 7,
//                 image: "/glass3.png",
//                 name: "Gucci GG 0741S",
//                 discount: "25% OFF",
//                 originalPrice: "₹30,000",
//                 price: "₹22,500",
//                 colors: 5,
//             },
//             {
//                 id: 8,
//                 image: "/glass4.png",
//                 name: "Versace VE 4361",
//                 discount: "10% OFF",
//                 originalPrice: "₹25,000",
//                 price: "₹22,500",
//                 colors: 4,
//             },
//         ],
//     },
//     {
//         label: "New Arrivals",
//         emoji: "/cool-1.svg",
//         products: [
//             {
//                 id: 1,
//                 image: "/glass3.png",
//                 name: "Gucci GG 0741S",
//                 discount: "25% OFF",
//                 originalPrice: "₹30,000",
//                 price: "₹22,500",
//                 colors: 5,
//             },
//             {
//                 id: 2,
//                 image: "/glass4.png",
//                 name: "Versace VE 4361",
//                 discount: "10% OFF",
//                 originalPrice: "₹25,000",
//                 price: "₹22,500",
//                 colors: 4,
//             },
//             {
//                 id: 3,
//                 image: "/glass1.png",
//                 name: "Ray Ban RB 90102R",
//                 discount: "20% OFF",
//                 originalPrice: "₹22,153",
//                 price: "₹20,250",
//                 colors: 9,
//             },
//             {
//                 id: 4,
//                 image: "/glass2.png",
//                 name: "Oakley OO 9208",
//                 discount: "15% OFF",
//                 originalPrice: "₹18,000",
//                 price: "₹15,300",
//                 colors: 6,
//             },
//             {
//                 id: 5,
//                 image: "/glass3.png",
//                 name: "Gucci GG 0741S",
//                 discount: "25% OFF",
//                 originalPrice: "₹30,000",
//                 price: "₹22,500",
//                 colors: 5,
//             },
//             {
//                 id: 6,
//                 image: "/glass4.png",
//                 name: "Versace VE 4361",
//                 discount: "10% OFF",
//                 originalPrice: "₹25,000",
//                 price: "₹22,500",
//                 colors: 4,
//             },
//             {
//                 id: 7,
//                 image: "/glass1.png",
//                 name: "Ray Ban RB 90102R",
//                 discount: "20% OFF",
//                 originalPrice: "₹22,153",
//                 price: "₹20,250",
//                 colors: 9,
//             },
//             {
//                 id: 8,
//                 image: "/glass2.png",
//                 name: "Oakley OO 9208",
//                 discount: "15% OFF",
//                 originalPrice: "₹18,000",
//                 price: "₹15,300",
//                 colors: 6,
//             },
//         ],
//     },
//     {
//         label: "Top Brands",
//         emoji: "/cool-2.svg",
//         products: [
//             {
//                 id: 5,
//                 image: "/glass1.png",
//                 name: "Prada PR 17WS",
//                 discount: "30% OFF",
//                 originalPrice: "₹35,000",
//                 price: "₹24,500",
//                 colors: 7,
//             },
//             {
//                 id: 6,
//                 image: "/glass2.png",
//                 name: "Dior DIOR0234",
//                 discount: "20% OFF",
//                 originalPrice: "₹28,500",
//                 price: "₹22,800",
//                 colors: 8,
//             },
//         ],
//     },
// ];


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
            const response = await fetch(`${baseApi}/products/getProductsByCategory/${category}?page=${currentPage}`); // Wait for response
            const data = await response.json(); // Wait for JSON parsing
            setProductsInfo(data);
            console.log("Products fetched:", data);
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

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
                        className={`flex items-center gap-2 px-5 py-2 rounded-md border-2 transition-all text-xs md:text-base ${active === item.name
                            ? "bg-[#763f98] text-white border-[#763f98]"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image width={18} height={18} alt="emoji" src={'/cool.svg'} className="hidden md:block" />
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
                        className=" text-center "
                    >
                        <div className="border border-[#763f98] flex flex-col justify-between">
                            <div className="flex-1 w-full  aspect-[5/4] flex items-center justify-center overflow-hidden">
                                <Image
                                    src={`${baseApi}/${product.image}`}
                                    width={150}
                                    height={150}
                                    alt={product.name}
                                    className="w-full object-contain"
                                />
                            </div>

                            <button className="bg-[#515151] text-white w-full text-sm md:text-xl py-2 md:py-4">
                                QUICK VIEW
                            </button>
                        </div>
                        <p className="text-[#763f98] font-semibold mt-2">{product.name}</p>
                        <p className="text-gray-500 text-sm line-through">Rs {product.price} /-</p>
                        <p className="text-xl font-bold">Rs {product.discounted_price} /-</p>
                        <p className="text-sm text-[#763f98]">AVAILABLE IN <br /> {product.colors.length} COLORS</p>
                        <button className="mt-3 bg-[#763f98] text-white px-4 py-2  text-sm md:text-base xl:text-xl font-semibold">
                            GRAB NOW!
                        </button>
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
                            className={cn("w-10 h-10", currentPage === page && "border border-white")}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </Button>
                    ))}

                    {/* Ellipsis if more pages exist */}
                    {currentPage < productsInfo.totalPages - 1 && <span className="text-gray-400">...</span>}

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
