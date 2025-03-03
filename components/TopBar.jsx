"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const offers = [
  { text: "🔥 50% Off on Eyewear!", link: "/offers/50-off" },
  { text: "🎉 Buy 1 Get 1 Free on Sunglasses!", link: "/offers/bogo" },
  { text: "💥 Flat ₹500 Off on Lenses!", link: "/offers/flat-500-off" },
];

export default function TopBar() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 3000); // Change offer every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 text-center py-2 w-full cursor-pointer z-50">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-semibold text-gray-700"
          onClick={() => router.push(offers[index].link)}
        >
          {offers[index].text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
