import React from 'react'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import Image from 'next/image'

const baseApi = process.env.NEXT_PUBLIC_BASE_API


const Page = async ({ params }) => {

    const {slug} = await params
    const brandName = slug

    const products = [
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
    ]

    const brand = async (brandName) => {
        try {
            const response = await fetch(`${baseApi}/brands/${brandName}`);
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to fetch brand:", error.message);
            return null; // Handle errors gracefully
        }
    };

    const brandData = await brand(brandName);
    // console.log("Brand Data:", brandData);


    return (
        <div>
            <div className="z-40">
                <TopBar />
            </div>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar />
            </div>


            <div className="heading mx-6 md:mx-32 space-y-6">
                <div className='flex justify-between '>
                    <h2 className='text-3xl font-semibold capitalize'>{brandData?.name}</h2>
                    <Image className='w-20' src={`${baseApi}${brandData?.logo}`} width={1000} height={1000} alt={`${brandData?.name}`} />
                </div>

                <p className='text-sm md:text-base '>{brandData?.description}</p>
            </div>

            <section className="products mx-6 md:mx-32">
                <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-[6.67%]" >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className=" text-center "
                        >
                            <div className="border border-[#763f98] aspect-square flex flex-col justify-between">
                                <div className="flex-1 flex items-center justify-center w-full">
                                    <Image
                                        src={product.image}
                                        width={150}
                                        height={150}
                                        alt={product.name}
                                        className="object-contain w-full"
                                    />
                                </div>

                                <button className="bg-[#515151] text-white w-full text-sm md:text-xl py-2 ">
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
                </div>
            </section>
        </div>
    )
}

export default Page