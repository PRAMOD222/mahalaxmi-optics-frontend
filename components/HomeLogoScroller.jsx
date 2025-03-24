"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";

const logos = [
    "/logo1.png",
    "/logo2.png",
    "/logo4.png",
    "/logo5.png",
];

const LogosScroller = () => {
    const carouselRef1 = useRef(null);
    const carouselRef2 = useRef(null);

    useEffect(() => {
        const cloneUL = (ref) => {
            const ul = ref.current;
            if (ul) {
                ul.insertAdjacentHTML("afterend", ul.outerHTML); // Duplicate the list
                ul.nextSibling.setAttribute("aria-hidden", "true"); // Hide duplicate for screen readers
            }
        };

        cloneUL(carouselRef1);
        cloneUL(carouselRef2);
    }, []);

    return (
        <div className="overflow-hidden w-full bg-white py-4">
            {/* Forward Scroll */}
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <ul
                    ref={carouselRef1}
                    className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_25s_linear_infinite]"
                >
                    {logos.map((logo, index) => (
                        <li key={index}>
                            <Image
                                className="w-[28vw] md:w-[16vw]"
                                src={logo}
                                alt={`Logo ${index + 1}`}
                                width={100}
                                height={50}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            {/* Reverse Scroll */}
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] mt-4">
                <ul
                    ref={carouselRef2}
                    className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_reverse_25s_linear_infinite]"
                >
                    {logos.map((logo, index) => (
                        <li key={index}>
                            <Image
                                className="w-[28vw] md:w-[16vw]"
                                src={logo}
                                alt={`Logo ${index + 1}`}
                                width={100}
                                height={50}
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LogosScroller;
