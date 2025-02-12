"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {

  const cart = useSelector(state => state.cart.cartItems);
  return (
    <header className="text-gray-600 body-font ">
      <div className="mx-4 md:mx-32 flex flex-col md:flex-row justify-between items-center py-2">
        <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          {/* <span className="text-orange-500 text-2xl font-bold">Logo</span> */}
          <Image width={200} height={200} src="/logo.png" className='w-24 py-2' alt="logo" />
        </Link>
        <nav className=" flex items-center justify-center">
          <Link href='/' className="p-2 m-2 text-xl hover:text-[#763F98] flex items-center">Home</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-[#763F98] flex items-center">About</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-[#763F98] flex items-center">Products</Link>
          <Link href='/' className="p-2 m-2 text-xl hover:text-[#763F98] flex items-center">Contact</Link>
        </nav>
        <Link href={'/cart'} className='flex flex-row'>
          <FaShoppingCart className='text-xl'/>
          <h2 className='relative top-[-8px] left-[2px] font-[500] bg-gray-500 px-2 py-.5 rounded-full text-white text-xs'> 
            {cart.length}
          </h2>
        </Link>
        <span><Link href={'/login'}>Login</Link>/<Link href={'/signup'}>Signup</Link></span>
      </div>
    </header>
  );
}
