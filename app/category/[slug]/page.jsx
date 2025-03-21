import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ProductImages from '@/components/products/ProductImages'
import ReviewStars from '@/components/ReviewStars'
import ProductColors from '@/components/products/ProductColors'
import ProductButtons from '@/components/products/ProductButtons'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { BreadcrumbWithCustomSeparator } from '@/components/BreadcrumbWithCustomSeparator'

const baseApi = process.env.NEXT_PUBLIC_BASE_API

const Page = async ({ params }) => {
    const { slug } = await params

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseApi}/products/getProductsByCategory/${slug}?currentPage=${1}`); // Wait for response
            const data = await response.json(); // Wait for JSON parsing
            console.log("Products fetched:", data);
            return data;
        } catch (error) {
            console.log("Error fetching products:", error);
        }
    };

    const data = await fetchData();

    const formatSlug = (name) => name.toLowerCase().replace(/ /g, '-');

    return (
        <div>

            <div className="z-40">
                <TopBar />
            </div>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar />
            </div>

            <BreadcrumbWithCustomSeparator paths={[{ label: "Home", href: "/" }, { label: "Category", href: `/category/${slug}` }]} imageSrc={'/5.jpg'} />
            <div className='mx-6 md:mx-32 grid grid-cols-2 md:grid-cols-4 gap-4 my-10'>
                {data.products?.map((product) => (
                    <div
                        key={product._id}
                        className=" text-center "
                    >
                        <div className=" border border-[#763f98] flex flex-col justify-between">
                            <Link href={`/product/${formatSlug(product.name)}`} className="flex-1 w-full aspect-[5/4] flex items-center justify-center overflow-hidden">
                                {product.thumbnail && <Image
                                    src={`${baseApi}${product.thumbnail}`}
                                    width={150}
                                    height={150}
                                    alt={product.name}
                                    className="w-full object-contain"
                                />}
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

                                            <h1 className="text-xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
                                            <p className="text-gray-500 text-sm">Code: {product.code}</p>

                                            <div className="flex items-center gap-4">
                                                <p className="text-4xl font-bold text-[#0071E3]">
                                                    ₹{product.price}
                                                </p>

                                                {product.discounted_price && (<p className="text-lg line-through text-gray-400">
                                                    ₹{product.discounted_price}
                                                </p>)}

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
                                                    Nose Bridge Length: {product.information.nose_bridge_length}
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
                        <p className="text-[#763f98] font-semibold mt-2">{product.name}</p>
                        {product.discounted_price && <p className="text-gray-500 text-sm line-through">Rs {product.discounted_price} /-</p>}
                        <p className="text-xl font-bold">Rs {product.price} /-</p>
                        <p className="text-sm text-[#763f98]">AVAILABLE IN <br /> {product.colors.length} COLORS</p>
                        <Link href={`/product/${formatSlug(product.name)}`} className="mt-3 bg-[#763f98] text-white px-4 py-2  text-sm md:text-base xl:text-xl font-semibold block">
                            GRAB NOW!
                        </Link>
                    </div>
                ))}
            </div>

            <Footer />

        </div>
    )
}

export default Page