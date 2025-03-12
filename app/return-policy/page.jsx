"use client";
// pages/return-policy.js
import React from 'react';
import Link from 'next/link';

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Return Policy</h1>
      <p className="mb-4">
        At <strong>Mahalaxmi Optical Traders</strong>, we aim to provide high-quality products and exceptional service. If you are not satisfied with your purchase, you may request a return under the terms outlined below.
      </p>

      <h2 className="text-xl font-semibold mt-6">Eligibility for Returns</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Return requests must be made within <strong>7 days</strong> of receiving your product.</li>
        <li>The product must be unused, in its original condition, and with all original packaging and tags intact.</li>
        <li>Proof of purchase (such as an order confirmation or receipt) is required to process the return.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Non-Returnable Items</h2>
      <p className="mt-2">
        Certain items are not eligible for returns, including but not limited to:
      </p>
      <ul className="list-disc ml-6 mt-2">
        <li>Perishable goods, personalized items, or digital products.</li>
        <li>Products that have been used, damaged, or altered after delivery.</li>
        <li>Products purchased during clearance sales or marked as non-returnable. </li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">How to Request a Return</h2>
      <ol className="list-decimal ml-6 mt-2">
        <li>Contact us at <Link href="mailto:mahalaxmiopticaltraders@gmail.com" className="text-blue-500 underline">mahalaxmiopticaltraders@gmail.com</Link> within 7 days of receiving your order.</li>
        <li>Provide your order details, reason for the return, and any supporting photos (if applicable).</li>
        <li>Our customer service team will review your request and provide you with return instructions.</li>
      </ol>

      <h2 className="text-xl font-semibold mt-6">Return Process</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>The returned item must be shipped back to the provided address within 7 days of receiving return approval.</li>
        <li>Once we receive and inspect the returned item, we will notify you of the approval or rejection of your return.</li>
        <li>If approved, you may choose a replacement product or receive a refund as per our Refund Policy.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Shipping Costs</h2>
      <ul className="list-disc ml-6 mt-2">
        <li>Customers are responsible for shipping costs associated with returning the product unless the return is due to our error.</li>
        <li>Shipping costs are non-refundable.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
      <p className="mt-2">
        If you have any questions about our Return Policy or need assistance, please contact us at 
        <a href="mailto:mahalaxmiopticaltraders@gmail.com" className="text-blue-500 underline">mahalaxmiopticaltraders@gmail.com</a>
      </p>
    </div>
  );
};

export default ReturnPolicy;
