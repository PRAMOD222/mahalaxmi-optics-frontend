"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
];

const LogosScroller = () => {
    const [items, setItems] = useState([...logos, ...logos]); // Duplicate logos initially

    useEffect(() => {
        const interval = setInterval(() => {
            moveLogos(); // Shift the first logo to the end
        }, 2000); // Adjust speed as needed

        return () => clearInterval(interval);
    }, []);

    const moveLogos = () => {
        setItems((prevItems) => {
            const firstLogo = prevItems[0]; // Get first logo
            return [...prevItems.slice(1), firstLogo]; // Move first to last
        });
    };

    return (
        <div className="overflow-hidden w-full bg-white py-4">
            <motion.div
                className="flex w-max gap-8"
                animate={{ x: ["0%", "-100%"] }}
                transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: "linear",
                }}
            >
                {items.map((logo, index) => (
                    <div key={index} className="flex-shrink-0 w-1/5">
                        <Image
                            src={logo}
                            alt={`Logo ${index + 1}`}
                            width={100}
                            height={50}
                            className="object-contain w-full h-auto"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default LogosScroller;
