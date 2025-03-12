
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Topbar from "@/components/Topbar";
// import Header from "@/components/Header";
import Image from "next/image";
import { CiCalendar } from "react-icons/ci";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { ScrollArea } from "@/components/ui/scroll-area"
import { BreadcrumbWithCustomSeparator } from "@/components/BreadcrumbWithCustomSeparator";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Page = async ({ params }) => {

    const slugdata = (await params).slug;


    const fetchBlog = async (id) => {
        try {
            const response = await fetch(`${baseApi}/blogs/getByTitle/${id}`,
                {
                    next: { tags: ["cleardata"] },
                }
            );
            const data = await response.json();
            // console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching blog:", error);
            return [];
        }
    }

    const blog = await fetchBlog(slugdata);


    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${baseApi}/blogs/`,
                {
                    next: { tags: ["cleardata"] },
                }
            );
            const data = await response.json();
            // console.log(data);
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
        // { label: blog.title, href: `/blogs/${blog.title}` },
    ];

    const formatdate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    }

    return (
        <div className="relative">
            <Topbar />
            <div className="sticky top-0 z-50">
                <Navbar />
                {/* <Header /> */}
            </div>
            <BreadcrumbWithCustomSeparator
                imageSrc="/inside-banner.jpg"
                title="Blogs"
                className=""
                paths={breadcrumbPaths} />
            <div className="mx-6 md:mx-32 xl:mx-44 py-10 flex gap-6 ">
                <main className="w-full md:w-3/4 space-y-6">
                    <section className="flex flex-col md:flex-row gap-6 w-full h-max">
                        <div className="w-full md:w-2/3 space-y-4 ">
                            <h1 className="text-3xl font-semibold ">{blog.title}</h1>
                            <h2 className="text-gray-500 flex items-center gap-1"><CiCalendar />{formatdate(blog.date)}</h2>
                            <p className="text-lg mb-4 text-gray-600 whitespace-pre-wrap ">{blog.description}</p>
                        </div>
                        <div className="images w-full md:w-1/3  ">
                            <Image className="object-cover w-full h-full" src={`${baseApi}${blog.image}`} width={1080} height={1080} alt={blog.title} />
                        </div>
                    </section>

                    <section>
                        <div className="w-full space-y-6 my-10">
                            {blog.content.length > 0 && blog.content.map((item, index) => (
                                <div key={index} className="">
                                    <h2 className="text-semibold text-xl">{item.title}</h2>
                                    <p className="mt-2 text-gray-600 whitespace-pre-wrap">{item.description} </p>
                                </div>
                            ))

                            }
                        </div>
                    </section>
                </main>

                <aside className="w-1/4 hidden md:block">
                    <ScrollArea className="h-screen border rounded-md p-2">
                        <h2 className="text-2xl font-bold mb-2 pb-2 text-[#00a651] sticky top-0 bg-white">Recent Blogs</h2>
                        <div className="space-y-6">
                            {blogs && blogs.length > 0 && blogs.map((blog) => (
                                <Link href={`/blogs/${blog._id}`} key={blog._id} className="group cursor-pointer block">
                                    <Image src={`${baseApi}${blog.image}`} className="w-full mb-2 object-cover" width={200} height={200} alt={blog.title} />
                                    <div className="space-y-1">
                                        <h2 className="text-gray-600 group-hover:text-[#007dc6] font-semibold">{blog.title}</h2>
                                        <h2 className="text-gray-500 flex items-center gap-1"><CiCalendar />{formatdate(blog.date)}</h2>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </ScrollArea>
                </aside>

            </div >
            
            <Footer />
        </div>
    )
}

export default Page