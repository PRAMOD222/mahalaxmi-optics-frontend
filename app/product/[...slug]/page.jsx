import ProductImages from "@/components/products/ProductImages";
import ProductButtons from "@/components/products/ProductButtons";
import { FaShippingFast, FaRegStar, FaRegHeart } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
import ProductColors from "@/components/products/ProductColors";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import ReviewStars from "@/components/ReviewStars";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const fetchProduct = async (productName) => {
  try {
    const response = await fetch(`${baseApi}/products/byName/${productName}`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

const Page = async ({ params }) => {
  const { slug } = await params;

  const product = await fetchProduct(slug);

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <div className="z-40">
        <TopBar />
      </div>
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      <div className="min-h-screen mx-4 md:mx-32 py-8 flex flex-col">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <ProductImages product={product} />
          </div>

          <div className="flex flex-col w-full md:w-1/2 space-y-2">
            <div>
              <ReviewStars rating={4.5} /> 10 Reviews
            </div>

            <h1 className="text-xl md:text-4xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 text-sm">Code: {product.code}</p>

            <div className="flex items-center gap-4">
              {product.price && (<p className="text-4xl font-bold text-[#0071E3]">
                ₹{product.discounted_price}
              </p>)}

              <p className="text-lg line-through text-gray-400">
                ₹{product.price}
              </p>

            </div>

            <p className="text-gray-500 text-sm">
              Tax included. Shipping calculated at checkout.
            </p>

            {product.colors && product.colors.length > 0 && (
              <ProductColors product={product} />
            )}

            <div className="space-y-4">
              <p className="text-gray-600 font-semibold">
                {" "}
                <span className="font-[1000]">Ideal For: </span>
                {product.ideal_for}
              </p>

              {/* <p className="text-gray-600 font-semibold">Warranty: <span className="font-normal">{product.warranty}</span></p>
              <p className="text-gray-600 font-semibold">Type: <span className="font-normal">{product.type}</span></p>
             */}
            </div>

            <div className="flex items-center gap-2">
              {product.brand && <Image
                src={`${baseApi}${product.brand.logo}`}
                width={100}
                height={100}
                alt={product.brand.name}
                className="h-8 w-fit rounded-md"
              />}
              {/* <p className="text-gray-600">Brand: {product.brand.name}</p> */}
            </div>

            {/*information*/}
            <div className="flex flex-wrap gap-3">
              <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                Material: {product.information.material}
              </p>
              <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                Lens Size: {product.information.lens_size}
              </p>
              <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                Nose Bridge Length: {product.information.nose_bridge_length}
              </p>
              <p className="text-[#763f98] whitespace-nowrap text-sm font-[800] bg-white border border-[#763f98]  rounded-full px-4 py-1 w-fit">
                Temple Length: {product.information.temple_length}
              </p>
            </div>

            <div className="">
              <ProductButtons product={product} />
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Tabs className="p-0 m-0 w-full" defaultValue="moreDetails">
            <TabsList className="p-0  h-fit w-full justify-start space-x-8 bg-transparent rounded-none py-0 my-0 m-0">
              <TabsTrigger
                className="rounded-none px-0 my-0 py-4 text-[16px] font-[800] border-b-2 border-transparent data-[state=active]:border-b-[#763f98]"
                value="moreDetails"
              >
                More Details
              </TabsTrigger>
              <TabsTrigger
                className="rounded-none px-0 my-0 py-4 text-[16px] font-[800] border-b-2 border-transparent data-[state=active]:border-b-[#763f98]"
                value="shippingandreturns"
              >
                Shipping and Returns
              </TabsTrigger>
            </TabsList>
            <div className="h-[1px] bg-gray-200 w-full"></div>
            <TabsContent className="p-4 min-h-[200px]" value="moreDetails">
              <div className="">
                <div className="space-y-3">
                  <p className="text-gray-600">
                    <span className="font-bold">Material:</span>{" "}
                    {product.information.material}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Lens Size:</span>{" "}
                    {product.information.lens_size}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Nose Bridge Length:</span>{" "}
                    {product.information.nose_bridge_length}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-bold">Temple Length:</span>{" "}
                    {product.information.temple_length}
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent
              className="p-4 min-h-[200px]"
              value="shippingandreturns"
            >
              <div className="space-y-6">
                <h2 className="text-gray-600 flex items-center gap-2">
                  <FaShippingFast className="text-xl" />
                  <span className="font-semibold">
                    Free Shipping Across India
                  </span>
                </h2>
                <h2 className="text-gray-600 flex items-center gap-2">
                  <FaRegStar className="text-xl" />
                  <span className="font-semibold">100% Authentic</span>
                </h2>
                <h2 className="text-gray-600 flex items-center gap-2">
                  <FaRegHeart className="text-xl" />
                  <span className="font-semibold">
                    Free in-house repairs & adjustments
                  </span>
                </h2>
                <h2 className="text-gray-600 flex items-center gap-2">
                  <IoIosReturnLeft className="text-xl" />
                  <span className="font-semibold">7-days easy exchange</span>
                </h2>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Page;
