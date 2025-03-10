'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

const logos =  [
  "/logo1.png",
  "/logo2.png",
  "/logo3.png",
  "/logo4.png",
  "/logo5.png",
];

const LogoCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const ul = carouselRef.current;
    if (ul) {
      ul.insertAdjacentHTML('afterend', ul.outerHTML);
      ul.nextSibling.setAttribute('aria-hidden', 'true');
    }
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-slate-900 overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-24">
        <div className="text-center">
          <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <ul
              ref={carouselRef}
              className="flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-[infinite-scroll_25s_linear_infinite]"
            >
              {logos.map((logo, index) => (
                <li key={index}>
                  <Image src={logo} alt={`Logo ${index + 1}`} width={100} height={50} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
