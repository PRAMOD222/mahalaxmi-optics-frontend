"use client"
import { useState, useEffect } from "react"
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const BannerSection = () => {

    const [banners, setBanners] = useState([]);

    const fetchBanners = async () => {
        try {
            const response = await fetch(`${baseApi}/banners/`); // Replace with your API endpoint
            const data = await response.json();
            setBanners(data);
            // console.log("Banners fetched:", data);

        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, [])

    return (
        <div className="flex flex-col lg:flex-row items-stretch w-full lg:aspect-[3/1] md:gap-2 ">

            <div className="w-full lg:w-2/3 h-full">
                <Carousel plugins={[Autoplay({ delay: 4000, }),]} className="relative h-full">
                    <CarouselContent className="h-full">

                        {
                            banners.map((banner, index) => (
                                <CarouselItem className="" key={index}>
                                    <div className=" relative">
                                        <div className="absolute right-20 top-1/2 -translate-y-1/2 text-white w-1/2 md:w-1/4 space-y-4">
                                            {banner.logo && <Image src={`${baseApi}${banner.logo}`} alt="logo" width={100} height={100} className="mx-auto" />}
                                            <h3 className="font-semibold text-lg md:text-3xl text-center capitalize">{banner.title}</h3>
                                            <Link href={banner.link} className="block border-2 text-center uppercase font-semibold py-2 px-4 hover:scale-105 transition-all duration-200">{banner.linkText}</Link>
                                        </div>

                                        <Image width={2000} height={1000} src={`${baseApi}${banner.banner_image}`} alt={banner.title} className="w-full h-auto" />

                                    </div>
                                </CarouselItem>
                            ))
                        }
                        {/* <CarouselItem className="">
                            <Image width={1000} height={1000} src="/homebanner.png" alt="Slide 1" className="w-full h-full object-cover" />
                        </CarouselItem> */}

                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-10" />
                    <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-10" />
                </Carousel>

            </div>

            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-2  h-full p-2 md:p-0">
                <div className="relative flex items-center justify-center  col-span-2 h-full">
                    <Image width={600} height={600} src='/bestseller.png' alt="banner text" className="object-cover w-full h-full" />
                    <div className="absolute border w-[94%] h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-white">
                    </div>

                    <div className="absolute right-20 top-1/2 -translate-y-1/2 text-black w-1/2 md:w-1/4 space-y-4">
                        <h3 className="font-semibold text-lg md:text-2xl text-center capitalize">EXCLUSIVE TRAVEL COLLECTION</h3>
                        <Link href="/" className="w-full absolute block border text-center uppercase font-semibold py-2 px-4 hover:scale-105 transition-all duration-200 text-black border-black">SHOP NOW</Link>
                    </div>
                </div>
                <Link href='/' className="relative flex items-center justify-center  h-full uppercase overflow-hidden group">
                    <h2 className="absolute top-[10%] left-[10%] w-1/3 text-lg md:text-2xl font-semibold z-40 " >Shop for Men</h2>
                    <Image width={600} height={600} src='/men.png' alt="banner text" className="object-cover transition-all duration-200 w-full h-full group-hover:scale-105" />
                </Link>
                <Link href='/' className="relative flex items-center justify-center  h-full uppercase overflow-hidden group">
                    <h2 className="absolute top-[10%] left-[10%] w-1/3 text-lg md:text-2xl font-semibold z-40 " >Shop for Women</h2>
                    <Image width={600} height={600} src='/women.png' alt="banner text" className="object-cover transition-all duration-200 w-full h-full group-hover:scale-105" />
                </Link>
            </div>
        </div>
    );
};

export default BannerSection;
