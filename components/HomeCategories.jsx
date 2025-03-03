"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Dummy product data
const categories = [
    {
        label: "Best Sellers",
        emoji: "/cool.svg",
        products: [
            {
                id: 1,
                image: "/glass1.png",
                name: "Ray Ban RB 90102R",
                discount: "20% OFF",
                originalPrice: "₹22,153",
                price: "₹20,250",
                colors: 9,
            },
            {
                id: 2,
                image: "/glass2.png",
                name: "Oakley OO 9208",
                discount: "15% OFF",
                originalPrice: "₹18,000",
                price: "₹15,300",
                colors: 6,
            },
            {
                id: 3,
                image: "/glass3.png",
                name: "Gucci GG 0741S",
                discount: "25% OFF",
                originalPrice: "₹30,000",
                price: "₹22,500",
                colors: 5,
            },
            {
                id: 4,
                image: "/glass4.png",
                name: "Versace VE 4361",
                discount: "10% OFF",
                originalPrice: "₹25,000",
                price: "₹22,500",
                colors: 4,
            },
            {
                id: 5,
                image: "/glass1.png",
                name: "Ray Ban RB 90102R",
                discount: "20% OFF",
                originalPrice: "₹22,153",
                price: "₹20,250",
                colors: 9,
            },
            {
                id: 6,
                image: "/glass2.png",
                name: "Oakley OO 9208",
                discount: "15% OFF",
                originalPrice: "₹18,000",
                price: "₹15,300",
                colors: 6,
            },
            {
                id: 7,
                image: "/glass3.png",
                name: "Gucci GG 0741S",
                discount: "25% OFF",
                originalPrice: "₹30,000",
                price: "₹22,500",
                colors: 5,
            },
            {
                id: 8,
                image: "/glass4.png",
                name: "Versace VE 4361",
                discount: "10% OFF",
                originalPrice: "₹25,000",
                price: "₹22,500",
                colors: 4,
            },
        ],
    },
    {
        label: "New Arrivals",
        emoji: "/cool-1.svg",
        products: [
            {
                id: 1,
                image: "/glass3.png",
                name: "Gucci GG 0741S",
                discount: "25% OFF",
                originalPrice: "₹30,000",
                price: "₹22,500",
                colors: 5,
            },
            {
                id: 2,
                image: "/glass4.png",
                name: "Versace VE 4361",
                discount: "10% OFF",
                originalPrice: "₹25,000",
                price: "₹22,500",
                colors: 4,
            },
            {
                id: 3,
                image: "/glass1.png",
                name: "Ray Ban RB 90102R",
                discount: "20% OFF",
                originalPrice: "₹22,153",
                price: "₹20,250",
                colors: 9,
            },
            {
                id: 4,
                image: "/glass2.png",
                name: "Oakley OO 9208",
                discount: "15% OFF",
                originalPrice: "₹18,000",
                price: "₹15,300",
                colors: 6,
            },
            {
                id: 5,
                image: "/glass3.png",
                name: "Gucci GG 0741S",
                discount: "25% OFF",
                originalPrice: "₹30,000",
                price: "₹22,500",
                colors: 5,
            },
            {
                id: 6,
                image: "/glass4.png",
                name: "Versace VE 4361",
                discount: "10% OFF",
                originalPrice: "₹25,000",
                price: "₹22,500",
                colors: 4,
            },
            {
                id: 7,
                image: "/glass1.png",
                name: "Ray Ban RB 90102R",
                discount: "20% OFF",
                originalPrice: "₹22,153",
                price: "₹20,250",
                colors: 9,
            },
            {
                id: 8,
                image: "/glass2.png",
                name: "Oakley OO 9208",
                discount: "15% OFF",
                originalPrice: "₹18,000",
                price: "₹15,300",
                colors: 6,
            },
        ],
    },
    {
        label: "Top Brands",
        emoji: "/cool-2.svg",
        products: [
            {
                id: 5,
                image: "/glass1.png",
                name: "Prada PR 17WS",
                discount: "30% OFF",
                originalPrice: "₹35,000",
                price: "₹24,500",
                colors: 7,
            },
            {
                id: 6,
                image: "/glass2.png",
                name: "Dior DIOR0234",
                discount: "20% OFF",
                originalPrice: "₹28,500",
                price: "₹22,800",
                colors: 8,
            },
        ],
    },
];

export default function HomeCategories() {
    const [active, setActive] = useState("Best Sellers");

    const activeCategory = categories.find((cat) => cat.label === active);

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
                {categories.map(({ label, emoji }) => (
                    <motion.button
                        key={label}
                        onClick={() => setActive(label)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-md border-2 transition-all text-xs md:text-base ${active === label
                            ? "bg-[#763f98] text-white border-[#763f98]"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                            }`}
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image width={18} height={18} alt="emoji" src={emoji} className="hidden md:block"/>
                        {label}
                    </motion.button>
                ))}
            </div>

            {/* Products */}
            <motion.div
                key={active}
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[6.67%]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {activeCategory?.products.map((product) => (
                    <div
                        key={product.id}
                        className=" text-center "
                    >
                        <div className="border border-[#763f98] aspect-square flex flex-col justify-between">
                            <div className="flex-1 flex items-center justify-center  w-full">
                                <Image
                                    src={product.image}
                                    width={150}
                                    height={150}
                                    alt={product.name}
                                    className="w-full max-w-full h-auto "
                                />
                            </div>

                            <button className="bg-[#515151] text-white w-full text-sm md:text-xl py-2 md:py-4">
                                QUICK VIEW
                            </button>
                        </div>
                        <p className="text-[#763f98] font-semibold mt-2">{product.name}</p>
                        <p className="text-gray-500 text-sm line-through">{product.originalPrice}</p>
                        <p className="text-xl font-bold">{product.price}</p> 
                        <p className="text-gray-600 text-sm">AVAILABLE IN {product.colors} COLORS</p>
                        <button className="mt-3 bg-[#763f98] text-white px-4 py-2  text-sm md:text-base xl:text-xl font-semibold">
                            GRAB NOW!
                        </button>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
