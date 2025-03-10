"use client";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"


const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
];

const LogosScroller = () => {
    return (
        <div>
            <Carousel>
                <CarouselContent>
                    {logos.map((logo, index) => (
                        <CarouselItem key={index} className="basis-1/4">
                            <Image
                                width={1000}
                                height={1000}
                                src={logo}
                                alt="Slide 1"
                                className="w-full h-full object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>

        </div>
    );
};

export default LogosScroller;
