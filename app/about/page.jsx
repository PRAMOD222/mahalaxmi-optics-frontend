// pages/terms-and-conditions.js
import React from 'react';
import Link from 'next/link';
const TermsAndConditions = () => {
  return (
    <div className="container">
      <div className=" px-4 py-8 md:mx-28 ">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="space-y-4 w-fit">
          <div className="space-y-2">
            <p>Welcome to Mahalaxmi Optics, your trusted partner in crystal-clear vision and timeless style. Established with a passion for enhancing the way you see the world, we have been dedicated to providing premium eyewear solutions that combine functionality with fashion.</p>
            <p>
            At Mahalaxmi Optics, we understand that your vision is precious. That&apos;s why we offer a curated selection of high-quality frames, lenses, and sunglasses from leading brands. Whether you&apos;re looking for classic styles, trendy designs, or cutting-edge technology, we have something to suit every personality and lifestyle.
            </p>
            <p>
            Our journey began with a commitment to exceptional customer care. From precise eye tests to expert frame selection, we ensure that every experience with us is seamless and personalized. Our skilled team of opticians and staff are here to help you make the right choice for your vision and style needs.
            </p>
           
          </div>
          <ul className="list-disc ">
            <h2 className='text-lg' >Why Choose Us</h2>
            <div className="ml-8">
              <li>
                <span className='font-semibold' >Premium Eyewear Collection: </span>
                Explore a variety of frames, lenses, and sunglasses that combine style and durability.
              </li>
              <li>
                <span className='font-semibold' >Personalized Service: </span>
                Our expert staff ensures you find the perfect eyewear that suits your face, comfort, and budget.
              </li>
              <li>
                <span className='font-semibold' >Advanced Eye Testing: </span>
                Equipped with modern technology, we provide accurate eye tests for optimal vision care.
              </li>
              <li>
                <span className='font-semibold' >Commitment to Quality: </span>
                Every product and service is backed by our dedication to excellence.
              </li>
            </div>
          </ul>
          <div className="space-y-2">
          <h2 className='text-lg' >Our Mission</h2>
            <p>To enhance the quality of life by providing innovative eyewear solutions that cater to every individual’s unique needs, ensuring they see the world with clarity and confidence.</p>
          </div>
          <div className="space-y-2">
          <h2 className='text-lg' >Visit Us</h2>
            <p>Step into Mahalaxmi Optics and let us help you find the perfect balance of vision, comfort, and style. Experience eyewear like never before!</p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default TermsAndConditions;
