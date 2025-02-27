"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from "react";
import { useSelector } from 'react-redux';
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, NavigationMenuViewport } from "@/components/ui/navigation-menu"
import { motion, AnimatePresence } from "framer-motion";


export default function Navbar() {

  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isShopForOpen, setIsShopForOpen] = useState(false);

  const dropdownAnimation = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const cart = useSelector(state => state.cart.cartItems);
  return (
    <header className="mx-6 md:mx-32 space-y-4">
      <div className="flex justify-between items-center my-2">
        <div>
          <div className='w-max flex items-center gap-2'>
            <Link className='border rounded-full border-purple-500 block' href='/'><FaFacebookF className='text-purple-500 m-1' /></Link>
            <Link className='border rounded-full border-purple-500 block' href='/'><FaInstagram className='text-purple-500 m-1' /></Link>
          </div>
          <div>
            <Link className='' href='/'>Customer Care 98900 98900</Link>
          </div>
        </div>
        <div>
          <Link href='/'>
            <Image src='/logo.png' alt='logo' width={200} height={100} />
          </Link>
        </div>
        <div className='flex items-center gap-2'>
          <Link href='/login' className='flex flex-col items-center'>
            <Image className='w-8' alt='user' width={20} height={20} src='/user.svg' />
            <h2 className='text-xs text-purple-500'>Account</h2>
          </Link>
          <Link href='/cart' className='flex flex-col items-center'>
            <Image className='w-8' alt='cart' width={20} height={20} src='/cart.svg' />
            <h2 className='text-xs text-purple-500'>Cart</h2>
          </Link>
        </div>
      </div>

      <nav className="flex justify-between items-center font-semibold">
        <div className=" flex justify-between items-center py-3 uppercase">
          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link href="#" className="hover:text-purple-500">Best Seller</Link>
            </li>

            {/* Shop by Brand Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsBrandOpen(true)}
              onMouseLeave={() => setIsBrandOpen(false)}
            >
              <button
                onClick={() => setIsBrandOpen(!isBrandOpen)}
                className="hover:text-purple-500 uppercase"
              >
                Shop by Brand
              </button>
              <AnimatePresence>
                {isBrandOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownAnimation}
                    className="absolute left-0 mt-3 w-[600px] bg-white shadow-lg p-5 grid grid-cols-4 gap-4 z-50 rounded-md"
                  >
                    <div>
                      <h3 className="font-bold">A - C</h3>
                      <ul>
                        <li>Akoni</li>
                        <li>Alexander McQueen</li>
                        <li>Balenciaga</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold">D - J</h3>
                      <ul>
                        <li>David Beckham</li>
                        <li>Dolce & Gabbana</li>
                        <li>Fendi</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold">K - O</h3>
                      <ul>
                        <li>Kate Spade</li>
                        <li>Kenzo</li>
                        <li>Marc Jacobs</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold">P - Z</h3>
                      <ul>
                        <li>Prada</li>
                        <li>Rayban</li>
                        <li>Tom Ford</li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* Shop For Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setIsShopForOpen(true)}
              onMouseLeave={() => setIsShopForOpen(false)}
            >
              <button
                onClick={() => setIsShopForOpen(!isShopForOpen)}
                className="hover:text-purple-500 uppercase"
              >
                Shop For
              </button>
              <AnimatePresence>
                {isShopForOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={dropdownAnimation}
                    className="absolute left-0 mt-3 bg-white shadow-lg p-3 rounded-lg w-48 z-50"
                  >
                    <ul>
                      <li><Link href="#" className="block py-2 hover:text-purple-500">Men</Link></li>
                      <li><Link href="#" className="block py-2 hover:text-purple-500">Women</Link></li>
                      <li><Link href="#" className="block py-2 hover:text-purple-500">Kids</Link></li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            <li>
              <Link href="#" className="hover:text-purple-500">Opticals</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-500">Sunglasses</Link>
            </li>
            <li>
              <Link href="#" className="hover:text-purple-500">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="searchbar">
          <div className="bg-purple-700 flex  rounded-md">
            <input
              type="text"
              placeholder="Search for best brands "
              className=" py-1 px-2 rounded-md bg-gray-200 focus:outline-none text-sm"
            />
            <h2 className='px-2 text-white flex items-center gap-2'>
              <span className='text-sm'>SEARCH</span>
              <Image alt='serach icon' width={18} height={18} src='/search.svg' />
            </h2>
          </div>
        </div>
      </nav>
    </header>
  );
}
