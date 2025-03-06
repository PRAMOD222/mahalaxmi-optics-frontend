import React from 'react'
import Footer from "@/components/Footer";
// import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
import Header from "@/components/Header";
import Image from "next/image";
import { PiClockCountdownFill } from "react-icons/pi";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { BreadcrumbWithCustomSeparator } from "@/components/BreadcrumbWithCustomSeparator";
import { CiCalendar } from "react-icons/ci";



const baseApi = process.env.NEXT_PUBLIC_BASE_API;


async function Page() {

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${baseApi}/blogs/`, {
                cache: "no-store",
                next: { tags: ["cleardata"] },
            });
            const data = await response.json();
            // console.log("data", data);
            return data;
        } catch (error) {
            console.error("Error fetching blogs:", error);
            return [];
        }
    };
    const blogs = await fetchBlogs();

    const breadcrumbPaths = [
        { label: "Home", href: "/" },
        { label: "Blogs", href: "/blogs" },
    ];

    const formatdate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }

    const formatName = (name) => {
        return name
            .replace(/[^a-zA-Z0-9 ]/g, '')  // Remove all special characters except spaces
            .trim()                          // Trim spaces at the start and end
            .replace(/\s+/g, '-')            // Replace spaces with "-"
            .toLowerCase();                  // Convert to lowercase
    };

    return (
        <div>
            <Topbar />
            <div className="sticky top-0 z-50">
                {/* <Navbar /> */}
                <Header />
            </div>

            <BreadcrumbWithCustomSeparator
                imageSrc="/inside-banner.jpg"
                title="Blogs"
                className=""
                paths={breadcrumbPaths} />

            <main>
                <div className=" bg-gray-50">

                    <div className="mx-6 md:mx-32 xl:mx-44 py-10 bg-gray-50 space-y-10">
                        <h1 className="text-3xl font-bold text-[#007dc6]">Blogs</h1>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {blogs.length > 0 ? blogs.map((blog) => (
                                <Link href={`/blogs/${formatName(blog.title)}`} key={blog._id} className="bg-white p-4 rounded-lg flex flex-col md:flex-row items-center justify-start gap-4 ">
                                    <div className="image w-full md:w-1/3">
                                        <Image src={`${baseApi}${blog.image}`} height={1000} width={1000} alt='Viya NetraSeva' className='rounded-md w-full' />
                                    </div>
                                    <div className="w-full md:w-2/3">
                                        <h2 className="text-lg font-semibold">{blog.title}</h2>
                                        <div className="flex items-center">
                                            <CiCalendar className="mr-2" />
                                            <span>{formatdate(blog.date)}</span>
                                            <h2 className='text-[#007dc6] font-semibold ml-4'>Read More</h2>
                                        </div>
                                        <p>{blog.description.slice(0, 100)}</p>
                                    </div>
                                </Link>
                            )) : <p className='text-2xl text-gray-500'>Blogs are not available yet</p>}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Page
