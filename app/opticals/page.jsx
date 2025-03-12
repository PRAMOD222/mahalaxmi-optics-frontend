import React from 'react'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

const baseApi = process.env.NEXT_PUBLIC_BASE_API


const Page = async () => {


    const fetchData = async () => {
        try {
            const response = await fetch(`${baseApi}/products/getProductsByType/opticals`);
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch Ideal For Products:", error.message);
            return null; // Handle errors gracefully
        }
    };

    const ProductsData = await fetchData();
    // console.log("Ideal For Data:", ProductsData);


    return (
        <div>
            <div className="z-40">
                <TopBar />
            </div>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar />
            </div>


            <section className="products mx-6 md:mx-32">
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[6.67%]">
                    {ProductsData?.products?.map((product) => (
                        <div
                            key={product._id}
                            className="text-center"
                        >
                            <div className="border border-[#763f98] aspect-square flex flex-col justify-between">
                                <div className="flex-1 flex items-center justify-center w-full aspect-[5/4] overflow-hidden">
                                    {product.thumbnail &&
                                        <Image
                                            src={`${baseApi}${product.thumbnail}`}
                                            width={150}
                                            height={150}
                                            alt={product.name}
                                            className="object-contain w-full"
                                        />}
                                </div>
                                <button className="bg-[#515151] text-white w-full text-sm md:text-xl py-2">
                                    QUICK VIEW
                                </button>
                            </div>
                            <p className="text-[#763f98] font-semibold mt-2">{product.name}</p>
                            <p className="text-gray-500 text-sm line-through">{product.originalPrice}</p>
                            <p className="text-xl font-bold">{product.price}</p>
                            <p className="text-gray-600 text-sm">AVAILABLE IN <br /> {product.colors.length} COLORS</p>
                            <button className="mt-3 bg-[#763f98] text-white px-4 py-2  text-sm md:text-base xl:text-xl font-semibold">
                                GRAB NOW!
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Page