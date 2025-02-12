import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RxDashboard } from "react-icons/rx";
import { CiCircleList } from "react-icons/ci";
import { AiFillProduct } from "react-icons/ai";
import { RiAdvertisementFill } from "react-icons/ri";

const DashNav = () => {
  return (
    <div>
        <div className="bg-neutral-800 min-h-screen h-full p-8 w-[20vw]">
            <div className="logo bg-white w-full mx-auto rounded-md">
                {/* <Image width={200} height={200} src="/logo.png" alt="logo" className='p-4 mx-auto'/> */}
            </div>

            <div className='links my-8 flex flex-col gap-8'>
                <Link href={"/dashboard"}>
                    <h2 className='flex items-center gap-2 p-4 bg-white rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#c19f5f] transition-all duration-300'> <RxDashboard className='inline text-xl' /> Dashboard</h2>
                </Link>
                <Link href={"/dashboard"}>
                    <h2 className='flex items-center p-4 gap-2 bg-white rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#c19f5f] transition-all duration-300'> <CiCircleList className='inline text-xl' />Orders</h2>
                </Link>
                <Link href={"/dashboard/products"}>
                    <h2 className='flex items-center p-4 gap-2 bg-white rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#c19f5f] transition-all duration-300'> <AiFillProduct className='inline text-xl' />Products</h2>
                </Link>
                <Link href={"/dashboard/banners"}>
                    <h2 className='flex items-center p-4 gap-2 bg-white rounded-md font-semibold text-gray-700 hover:text-white hover:bg-[#c19f5f] transition-all duration-300'> <RiAdvertisementFill className='inline text-xl' />Banners</h2>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default DashNav