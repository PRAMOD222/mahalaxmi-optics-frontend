"use client";
import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
// import Header from "@/components/Header";
import Image from "next/image";
// import { BreadcrumbWithCustomSeparator } from "@/components/BreadcrumbWithCustomSeparator";

export default function Home() {
    const [testimonials, setTestimonials] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const breadcrumbPaths = [
    //     { label: "Home", href: "/" },
    //     { label: "Testimonials" },
    // ];

    const fetchTestimonials = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/testimonials/all-testimonials`);
            const data = await response.json();
            setTestimonials(data);
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            setError("Failed to load testimonials.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const renderStars = (rating) => {
        return Array(5)
            .fill()
            .map((_, index) => {
                return index < rating ? (
                    <FaStar key={index} color="#00A651" />
                ) : (
                    <FaRegStar key={index} color="#e4e5e9" />
                );
            });
    };

    return (
        <>
            <Topbar />
            <div className="sticky top-0 z-50">
                <Navbar />
            </div>
            {/* <BreadcrumbWithCustomSeparator
                paths={breadcrumbPaths}
                imageSrc="/testimonial.png"
                title="Testimonials"
                className="imageSrc:h-200"
            /> */}
            <main className="space-y-4 mx-6 md:mx-32 xl:mx-44 py-12 ">
                <h2 className="text-center text-3xl font-semibold text-[#007dc6]" >Testimonials</h2>
                {loading ? (
                    <div className="text-center">Loading testimonials...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : testimonials.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="flex flex-col items-center bg-white  p-4 rounded-sm shadow-md text-center">
                                <div className="text-green-600 flex justify-center text-sm py-2">
                                    {renderStars(testimonial.rating)}
                                </div>
                                <p className="text-gray-700 text-xs my-2">
                                    &quot;{testimonial.message}&quot;
                                </p>
                                <p className="text-green-600 font-bold mt-auto border-t-2 border-green-500">
                                    {testimonial.name}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No testimonials found.</p>
                )}
            </main>
            <Footer />
        </>
    );
}
