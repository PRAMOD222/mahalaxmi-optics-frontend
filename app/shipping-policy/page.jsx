// pages/shipping-policy.js
import React from 'react';
import Link from 'next/link';
const ShippingPolicy = () => {
  return (
    <div className='container' >
      <div className="px-4 py-8 md:mx-28 ">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>
        <p className="mb-4">
          At <strong>Mahalaxmi Optical Traders</strong>, we are dedicated to delivering your orders promptly and efficiently. This Shipping Policy outlines the terms and conditions related to the shipment of our products.
        </p>

        <h2 className="text-xl font-semibold mt-6">Shipping Timeline</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>Orders are typically processed within <strong>1-2 business days</strong> after confirmation.</li>
          <li>Estimated delivery time is between <strong>5 to 8 business days</strong>.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Order Tracking</h2>
        <p className="mt-2">
          Once your order is shipped, we will provide a tracking number via email. You can use this number to track your package on the carrier&apos;s website.
        </p>

        <h2 className="text-xl font-semibold mt-6">Delivery Delays</h2>
        <p className="mt-2">
          While we aim to deliver your order within the estimated timeframe, delays may occur due to unforeseen circumstances, such as:
        </p>
        <ul className="list-disc ml-6 mt-2">
          <li>Weather conditions or natural disasters.</li>
          <li>Operational challenges during high-demand periods.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Damaged or Lost Packages</h2>
        <ul className="list-disc ml-6 mt-2">
          <li>If your package is damaged during transit, please contact us within <strong>48 hours</strong> of delivery with photos of the damage.</li>
          <li>In the case of lost packages, please reach out to us for assistance with filing a claim with the carrier.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
        <p className="mt-2">
          For any questions or concerns regarding shipping, please contact us at
          <Link href="mailto:mahalaxmiopticaltraders@gmail.com" className="text-blue-500 underline">mahalaxmiopticaltraders@gmail.com</Link>.
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;
