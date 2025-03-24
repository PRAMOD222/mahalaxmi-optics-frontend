import React from 'react'
import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import ProductsGrid from '@/components/ProductsGrid'
import Link from 'next/link'

const baseApi = process.env.NEXT_PUBLIC_BASE_API

const Page = async ({ params }) => {
    const { slug } = params;

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseApi}/products/getProductsByShape/${slug}`);
            if (!response.ok) throw new Error(`Error: ${response.status} ${response.statusText}`);

            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Failed to fetch Ideal For Products:", error.message);
            return null;
        }
    };

    const ProductsData = await fetchData();

    return (
        <div>
            <div className="z-40">
                <TopBar />
            </div>
            <div className="sticky top-0 z-50 bg-white">
                <Navbar />
            </div>

            <section className="products mx-6 md:mx-32 my-10">
                {ProductsData && ProductsData.products?.length > 0 ? (
                    <ProductsGrid products={ProductsData.products} />
                ) : (
                    <div className="text-center py-10">
                        <h2 className="text-2xl font-semibold">No Products Found</h2>
                        <p className="text-gray-600 mt-2">You can explore other collections.</p>
                        <Link href="/">
                            <button className="mt-4 px-6 py-2 bg-[#6A1B9A] text-white rounded-lg hover:bg-[#7F0EEA]">
                                Browse Collections
                            </button>
                        </Link>
                    </div>
                )}
            </section>
        </div>
    )
}

export default Page
