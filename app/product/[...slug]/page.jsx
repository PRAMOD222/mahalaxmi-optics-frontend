import ProductImages from "@/components/products/ProductImages";
import ProductButtons from "@/components/products/ProductButtons";
import { FaShippingFast, FaRegStar, FaRegHeart } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
import ProductColors from "@/components/products/ProductColors";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";

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
  const productName = params.slug;
  const product = await fetchProduct(productName);

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <div className="z-40">
        <TopBar />
      </div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>

      <div className="min-h-screen mx-4 md:mx-32 flex flex-col md:flex-row">
        <div className="w-full">
        <ProductImages product={product} />
        </div>
        

        <div className="md:ml-8 w-full md:w-full">
          <h1 className="text-2xl font-semibold mb-4">{product.name}</h1>
          <p className="text-gray-500 text-sm">Code: {product.code}</p>

          <p className="text-4xl font-semibold text-[#0071E3]">₹{product.price}</p>
          {product.discounted_price && (
            <p className="text-lg line-through text-gray-400">₹{product.discounted_price}</p>
          )}

          <p className="text-gray-500 text-sm mb-4">
            Tax included. Shipping calculated at checkout.
          </p>

          <ProductButtons product={product} />

          {product.colors && product.colors.length > 0 && <ProductColors product={product} />}

          <p className="text-gray-600 mt-4">Ideal For: {product.ideal_for}</p>
          <p className="text-gray-600">Warranty: {product.warranty}</p>
          <p className="text-gray-600">Type: {product.type}</p>

          <div className="flex items-center mt-4">
            <img src={`${baseApi}${product.brand.logo}`} alt={product.brand.name} className="h-10 w-10 rounded-md mr-2" />
            <p className="text-gray-600">Brand: {product.brand.name}</p>
          </div>

          <div className="flex items-center mt-2">
            <img src={`${baseApi}${product.category.image}`} alt={product.category.name} className="h-10 w-10 rounded-md mr-2" />
            <p className="text-gray-600">Category: {product.category.name}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold text-lg">Product Details:</h3>
            <p className="text-gray-600">Material: {product.information.material}</p>
            <p className="text-gray-600">Lens Size: {product.information.lens_size}</p>
            <p className="text-gray-600">Nose Bridge Length: {product.information.nose_bridge_length}</p>
            <p className="text-gray-600">Temple Length: {product.information.temple_length}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-gray-600 mt-4">
              <FaShippingFast className="inline text-xl mr-5" />
              Free Shipping Across India
            </h2>
            <h2 className="text-gray-600">
              <FaRegStar className="inline text-xl mr-5" />
              100% Authentic
            </h2>
            <h2 className="text-gray-600">
              <FaRegHeart className="inline text-xl mr-5" />
              Free in-house repairs & adjustments
            </h2>
            <h2 className="text-gray-600">
              <IoIosReturnLeft className="inline text-xl mr-5" />
              7-days easy exchange
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
