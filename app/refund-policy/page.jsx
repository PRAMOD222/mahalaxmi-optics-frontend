"use client";
// pages/terms-and-conditions.js
import React from 'react';
import Link from 'next/link';
const TermsAndConditions = () => {
  return (
    <div className="container">
      <div className=" px-4 py-8 md:mx-28 ">
        <h1 className="text-3xl font-bold mb-6">Returns and Refunds</h1>
        <div className="space-y-4 w-fit">
          {/* <div className="space-y-2 ">
            <h2 className='font-bold text-lg' >No Returns</h2>
            <p>
              All sales are final, and we do not accept returns on any of our products. We encourage our customers to carefully review all product descriptions and details before making a purchase.
            </p>
            <p>
              By completing a purchase, you agree to these terms and understand that no returns will be accepted for any reason.
            </p>
          </div>
          <div className="space-y-2 ">
            <h2 className='font-bold text-lg' >No Refunds</h2>
            <p>
              We have a strict no refund policy. Once a purchase is made, no refunds will be issued under any circumstances. We encourage customers to thoroughly review product descriptions before making a purchase, as all sales are final.
            </p>
            <p>
              By completing a purchase, you agree to this no refund policy.
            </p>
          </div> */}
          <ul className="list-disc ">
            <h2 className='font-bold text-lg' >Order Cancellation</h2>
            <h2 className='font-semibold' >Physical Products </h2>
            <div className="ml-8">
              <li>
                Orders can be cancelled only before the item is shipped.
              </li>
              <li>
                Orders already shipped cannot be cancelled.
              </li>


            </div>
          </ul>
          <ul className="list-disc ">
            <h2 className='font-bold text-lg' >Refund Policy</h2>
            <h2 className='font-semibold' >No-Refund Policy </h2>
            <p>We maintain a strict no-refund policy for all products. However, we may make exceptions in the following cases:</p>
            <div className="ml-8">
              <li>
                Product Not Received.
              </li>
              <li>
                If the product is lost in transit.
              </li>
              <li>
                If the wrong product is delivered.
              </li>
              <li>
                If the product is damaged during shipping.
              </li>
            </div>
            <h2 className='font-semibold' >Refund Process (When Applicable) </h2>
            <p>If any refund is approved, the amount will be credited back to the original payment method within 7-14 business days</p>
          </ul>
          <ul className="list-disc ">
            <h2 className='font-bold text-lg' >Return Policy</h2>
            <p>We are committed to ensuring customer satisfaction and stand by the quality of our products. Below is our return policy to guide you through the return and replacement process:</p>
            <h2 className='font-semibold' >Eligibility for Return </h2>
            <div className="ml-8">
              <li>
              Returns are accepted only for defective, damaged, or incorrect products received.
              </li>
              <li>
              The return request must be initiated within 24 hours of receiving the product.
              </li>
            </div>
            <h2 className='font-semibold' >Return Process </h2>
            <div className="ml-8">
              <li>
              If your return request is approved, the replacement process will be initiated within 2-3 business days.
              </li>
              <li>
              Once the replacement is dispatched, it is expected to be delivered within 4-7 business days.
              </li>
            </div>
            <h2 className='font-semibold' >Important Notes </h2>
            <div className="ml-8">
              <li>
              Delivery timelines may be affected by delays from the transport company, adverse weather conditions, or other unforeseen circumstances.
              </li>
              <li>
              We are not responsible for delays caused by external factors beyond our control.
              </li>
            </div>
          </ul>
          <p>We aim to make the return and replacement process as seamless as possible.</p>
        </div>


      </div>
    </div>
  );
};

export default TermsAndConditions;
