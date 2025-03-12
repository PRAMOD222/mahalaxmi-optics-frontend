"use client";
// pages/terms-and-conditions.js
import React from 'react';
import Link from 'next/link';
const TermsAndConditions = () => {
  return (
    <div className="container">
      <div className=" px-4 py-8 md:mx-28 ">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="space-y-4 w-fit">
          <ul className="list-disc ">
            <h2>1. Information We Collect</h2>
            <div className="ml-8">
              <li>
                <span className='font-semibold' >Personal Information: </span>
                We collect personal details such as your name, email address, shipping address, phone number, and payment information when you make a purchase, create an account, or contact us.
              </li>
              <li>
                <span className='font-semibold' >Non-Personal Information: </span>
                We may collect non-personal data such as browser type, operating system, and browsing behavior to improve our website and services.
              </li>
            </div>
          </ul>
          <ul className="list-disc ">
            <h2>2. How We Use Your Information</h2>
            <div className="ml-8">
              <li>
                <span className='font-semibold' >To Process Orders: </span>
                We use your personal information to process and fulfill your orders.
              </li>
              <li>
                <span className='font-semibold' >To Communicate: </span>
                We use your contact information to send you updates about your order, respond to inquiries, and send promotional materials if you have opted in.
              </li>
              <li>
                <span className='font-semibold' >To Improve Our Services: </span>
                We analyze non-personal information to understand user behavior and enhance our website&apos;s performance.
              </li>
            </div>
          </ul>
          <ul className="list-disc ">
            <h2>3. Information Sharing</h2>
            <div className="ml-8">
              <li>
                <span className='font-semibold' >Third-Party Service Providers: </span>
                We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering orders.
              </li>
              <li>
                <span className='font-semibold' >Legal Requirements: </span>
                We may disclose your information if required by law or to protect our rights.
              </li>
            </div>
          </ul>
          <ul className="list-disc ">
            <h2>4. Data Security</h2>
            <div className="ml-8">
              <li>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
              </li>
              
            </div>
          </ul>
          <ul className="list-disc ">
            <h2>5. Your Rights</h2>
            <div className="ml-8">
              <li>
                <span className='font-semibold' >Access and Correction: </span>
                You have the right to access and correct your personal information. You can update your account details through our website.
              </li>
              <li>
                <span className='font-semibold' >Opt-Out: </span>
                You can opt-out of receiving promotional emails by following the unsubscribe instructions in the emails.
              </li>
            </div>
          </ul>
          <ul className="list-disc ">
            <h2>6. Changes to This Policy</h2>
            <div className="ml-8">
              <li>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top of the policy.
              </li>
              
            </div>
          </ul>
        </div>


      </div>
    </div>
  );
};

export default TermsAndConditions;
