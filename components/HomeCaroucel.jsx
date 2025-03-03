"use client"
import Link from "next/link";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"


const BannerSection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-stretch w-full lg:aspect-[3/1]  ">

            <div className="w-full lg:w-2/3 h-full">
                <Carousel className="relative h-full">
                    <CarouselContent className="h-full">
                        <CarouselItem className="">
                            <Image width={1000} height={1000} src="/homebanner.png" alt="Slide 1" className="w-full h-full object-cover" />
                        </CarouselItem>
                        <CarouselItem>
                            <Image width={1000} height={1000} src="/homebanner.png" alt="Slide 1" className="w-full h-full object-cover" />
                        </CarouselItem>
                        <CarouselItem>
                            <Image width={1000} height={1000} src="/homebanner.png" alt="Slide 1" className="w-full h-full object-cover" />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 left-10" />
                    <CarouselNext className="absolute top-1/2 -translate-y-1/2 right-10" />
                </Carousel>

            </div>

            <div className="w-full lg:w-1/3 grid grid-cols-2 gap-2  h-full p-2 md:p-0">
                <Link href='/' className="relative flex items-center justify-center rounded-lg col-span-2 h-full">
                    <Image width={600} height={600} src='/bestseller.png' alt="banner text" className="object-cover w-full h-full" />
                </Link>
                <Link href='/' className="relative flex items-center justify-center rounded-lg h-full">
                    <Image width={600} height={600} src='/men.png' alt="banner text" className="object-cover w-full h-full" />
                </Link>
                <Link href='/' className="relative flex items-center justify-center rounded-lg h-full">
                    <Image width={600} height={600} src='/women.png' alt="banner text" className="object-cover w-full h-full" />
                </Link>
            </div>
        </div>
    );
};

export default BannerSection;
