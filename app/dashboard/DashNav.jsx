"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { RiAdvertisementFill } from "react-icons/ri";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

const DashNav = () => {
  const pathname = usePathname();


  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }

    window.location.href = "/";
  };


  return (
    <div className="w-[20vw]">
      <div className="fixed  bg-[#763f98] shadow-lg min-h-screen h-full p-8 w-[20vw]">
        <Link
          href={"/"}
          className="logo bg-white w-full mx-auto rounded-md block p-4"
        >
          <Image alt="brand logo" src='/logo.png' width={100} height={100} className="mx-auto" />
        </Link>
        <div className="logo bg-black w-full mx-auto rounded-md">
          {/* <Image width={200} height={200} src="/logo.png" alt="logo" className='p-4 mx-auto'/> */}
        </div>

        <div className="links my-2 flex flex-col gap-2">
          <Link href={"/dashboard"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname === "/dashboard"
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Dashboard
            </h2>
          </Link>

          <Link href={"/dashboard/categories"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname === "/dashboard/categories"
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Categories
            </h2>
          </Link>

          <Link href={"/dashboard/brands"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname === "/dashboard/brands"
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              {" "}
              <RxDashboard className="inline text-xl" /> Brands
            </h2>
          </Link>
          <Link href={"/dashboard/products"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname.startsWith("/dashboard/products")
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              <AiFillProduct className="inline text-xl" />
              Products
            </h2>
          </Link>
          <Link href={"/dashboard/banners"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname.startsWith("/dashboard/banners")
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              <RiAdvertisementFill className="inline text-xl" />
              Banners
            </h2>
          </Link>
          <Link href={"/dashboard/testimonial"}>
            <h2
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-all duration-300 ${pathname.startsWith("/dashboard/testimonial")
                  ? "bg-white text-[#763f98]"
                  : "hover:bg-white text-white hover:text-[#763f98] bg-[#53286e]"
                }`}
            >
              <RiAdvertisementFill className="inline text-xl" />
              Testimonial
            </h2>
          </Link>

        </div>
        

        <Button className="bg-white hover:bg-white border-2 text-black" onClick={handleLogout} >Logout</Button>
      </div>


    </div>
  );
};

export default DashNav;
