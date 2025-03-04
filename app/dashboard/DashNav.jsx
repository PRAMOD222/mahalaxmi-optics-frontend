"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { RiAdvertisementFill } from "react-icons/ri";
import { usePathname } from "next/navigation";

const DashNav = () => {
  const pathname = usePathname();
  return (
    <div className="w-[20vw]">
      <div className="fixed  bg-white shadow-lg min-h-screen h-full p-8 w-[20vw]">
        <Link
          href={"/"}
          className="logo bg-white w-full mx-auto rounded-md block"
        >
          <h2 className="font-[800] text-2xl text-justify">
            Mahalaxmi Optics .
          </h2>
        </Link>
        <div className="logo bg-black w-full mx-auto rounded-md">
          {/* <Image width={200} height={200} src="/logo.png" alt="logo" className='p-4 mx-auto'/> */}
        </div>

        <div className="links my-8 flex flex-col gap-2">
          <Link href={"/dashboard"}>
            <h2
              className={`flex items-center gap-2 px-4 py-4 rounded-md font-semibold transition-all duration-300 ${
                pathname === "/dashboard"
                  ? "bg-[#763f98] text-white"
                  : "bg-[#763f98]/30 text-black hover:text-white hover:bg-[#763f98]"
              }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Dashboard
            </h2>
          </Link>

          <Link href={"/dashboard/categories"}>
            <h2
              className={`flex items-center gap-2 px-4 py-4 rounded-md font-semibold transition-all duration-300 ${
                pathname === "/dashboard/categories"
                  ? "bg-[#763f98] text-white"
                  : "bg-[#763f98]/30 text-black hover:text-white hover:bg-[#763f98]"
              }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Categories
            </h2>
          </Link>

          <Link href={"/dashboard/brands"}>
            <h2
              className={`flex items-center gap-2 px-4 py-4 rounded-md font-semibold transition-all duration-300 ${
                pathname === "/dashboard/brands"
                  ? "bg-[#763f98] text-white"
                  : "bg-[#763f98]/30 text-black hover:text-white hover:bg-[#763f98]"
              }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Brands
            </h2>
          </Link>
          <Link href={"/dashboard/products"}>
            <h2
              className={`flex items-center gap-2 px-4 py-4 rounded-md font-semibold transition-all duration-300 ${
                pathname.startsWith("/dashboard/products")
                  ? "bg-[#763f98] text-white"
                  : "bg-[#763f98]/30 text-black hover:text-white hover:bg-[#763f98]"
              }`}
            >
              <AiFillProduct className="inline text-xl" />
              Products
            </h2>
          </Link>
          <Link href={"/dashboard"}>
            <h2 className="flex items-center px-4 py-4 bg-[#763f98]/30 rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#763f98] transition-all duration-300">
              {" "}
              <CiCircleList className="inline text-xl" />
              Orders
            </h2>
          </Link>
          <Link href={"/dashboard/banners"}>
            <h2 className="flex items-center px-4 py-4 bg-[#763f98]/30 rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#763f98] transition-all duration-300">
              {" "}
              <RiAdvertisementFill className="inline text-xl" />
              Banners
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashNav;
