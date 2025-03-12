import React from "react";
import Link from "next/link";
import Image from "next/image";
import Styles from "@/css/home.module.css";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="container">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <Image
          src="/2.jpg" // Add a high-quality hero image in the public folder
          alt="Eyewear"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="text-center z-20 ">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in">
            Welcome to Mahalaxmi Optics
          </h1>
          <p className="text-base md:text-xl mb-8 animate-fade-in delay-100">
            Redefining your eyewear experience with style, precision, and comfort.
          </p>
        </div>
      </section>

      {/* Our Journey Section (Timeline Style) */}
      <section className="py-12 px-6 md:px-32 bg-white">
        <div className="text-center space-y-8 mb-16">
          <h2 className="text-4xl font-bold text-gray-800">Our Journey</h2>
          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 w-1 h-full bg-gray-200 transform -translate-x-1/2"></div>

            {/* Timeline Items */}
            {[
              {
                year: "2010",
                title: "Humble Beginnings",
                description: "Mahalaxmi Optics started as a small eyewear store with a vision to provide affordable and stylish eyewear.",
              },
              {
                year: "2015",
                title: "Expanding Horizons",
                description: "We expanded our product range to include premium brands and introduced advanced eye testing technology.",
              },
              {
                year: "2020",
                title: "National Recognition",
                description: "Mahalaxmi Optics became a trusted name across India, known for quality and customer satisfaction.",
              },
              {
                year: "2023",
                title: "Innovation & Growth",
                description: "We continue to innovate, offering cutting-edge eyewear solutions and personalized services.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`flex ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                } items-center mb-8`}
              >
                <div className="w-1/2 p-4">
                  <h3 className="text-2xl font-bold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <div className="w-1/2 flex justify-center">
                  <div className="w-16 h-16 bg-[#763f98] rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {item.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section with Cards */}
      <section className={`${Styles.homebg}`}>
  <div className="mx-4 md:mx-32 py-8">
    <h2 className="text-2xl md:text-4xl mb-6 md:mb-8 text-white font-semibold text-center">
      CHANGING THE WAY PEOPLE BUY GLASSES
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
      {/* Pan India Delivery */}
      <div className="flex flex-col items-center text-white p-4 md:p-6 gap-2 md:gap-4">
        <Image
          className="w-1/2"
          width={400}
          height={400}
          alt="Pan India Delivery"
          src={'/delivery-man.svg'}
        />
        <h2 className="text-lg md:text-xl font-semibold text-center">
          Pan India <br /> Delivery
        </h2>
      </div>

      {/* 100% Authentic */}
      <div className="flex flex-col items-center text-white p-4 md:p-6 gap-2 md:gap-4">
        <Image
          className="w-1/2"
          width={400}
          height={400}
          alt="100% Authentic"
          src={'/original.svg'}
        />
        <h2 className="text-lg md:text-xl font-semibold text-center">
          100% <br /> Authentic
        </h2>
      </div>

      {/* After Sales Service */}
      <div className="flex flex-col items-center text-white p-4 md:p-6 gap-2 md:gap-4">
        <Image
          className="w-1/2"
          width={400}
          height={400}
          alt="After Sales Service"
          src={'/rating.svg'}
        />
        <h2 className="text-lg md:text-xl font-semibold text-center">
          After <br /> Sales Service
        </h2>
      </div>

      {/* Easy Payment Options */}
      <div className="flex flex-col items-center text-white p-4 md:p-6 gap-2 md:gap-4">
        <Image
          className="w-1/2"
          width={400}
          height={400}
          alt="Easy Payment Options"
          src={'/payment.svg'}
        />
        <h2 className="text-lg md:text-xl font-semibold text-center">
          Easy <br /> Payment Options
        </h2>
      </div>
    </div>
  </div>
</section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-6 md:px-32 bg-white">
        <div className="text-center space-y-6 mb-4">
          <h2 className="text-4xl font-bold text-gray-800">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div>
                <h3 className="text-2xl font-semibold">Exclusive Eyewear Collection</h3>
                <p className="text-gray-600">
                  Explore the latest and exclusive collection of eyewear designed for all ages and preferences.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-6 p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">
              <div>
                <h3 className="text-2xl font-semibold">Personalized Service</h3>
                <p className="text-gray-600">
                  Our experts help you choose eyewear that perfectly fits your personality and needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section (Clean and Elegant) */}
      <section className="py-8 px-6 md:px-32 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">Our Mission</h2>
          <p className="text-xl text-gray-600 mb-8">
            At Mahalaxmi Optics, our mission is to empower you to see the world with clarity and confidence. We strive to provide innovative, stylish, and high-quality eyewear solutions that cater to your unique needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "/vision.png",
                title: "Vision",
                description: "To redefine eyewear with innovation and style.",
              },
              {
                icon: "/quality.png",
                title: "Quality",
                description: "Delivering products that stand the test of time.",
              },
              {
                icon: "/care.png",
                title: "Care",
                description: "Personalized service for every customer.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-8 px-6 md:px-32 bg-white">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-gray-800">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Step into Mahalaxmi Optics and let us help you find the perfect balance of vision, comfort, and style. Experience eyewear like never before!
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#763f98] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;