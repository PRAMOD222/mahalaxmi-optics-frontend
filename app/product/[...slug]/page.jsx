import products from "@/app/products";
import ProductButtons from "@/components/products/ProductButtons";
import Image from "next/image";
import { FaShippingFast, FaRegStar, FaRegHeart } from "react-icons/fa";
import { IoIosReturnLeft } from "react-icons/io";
const page = async ({ params }) => {
  const slug = await params;
  const productid = await slug.slug;
  let product = null;

  for (const category in products) {
    product = products[category].find((item) => item.id == productid);
    if (product) {
      break;
    }
  }

  return (
    <div className="min-h-screen h-fit mx-4 md:mx-32">
      {product ? (
        <div className="flex flex-col md:flex-row ">
          <div className=" p-2 pb-8 md:pr-12">
            <Image
              width={1000}
              height={1000}
              src={product.image}
              alt={product.name}
              className=" h-full w-full object-cover mb-4 md:mb-0"
            />
          </div>
          <div className="md:ml-8 w-full">
            <h1 className="text-2xl font-[500] mb-4">{product.name}</h1>
            <p className="text-4xl font-semibold ">₹{product.price}</p>
            <p className='text-gray-500 text-sm mb-4' >Tax included. Shipping calculated at checkout.</p>
            <p className="font-[500] text-gray-600 mb-4">
             COLOR: {product.description}
            </p>
            <h2 className="mb-4" >Size: 38</h2>

            <ProductButtons product={product} />

            <h2 className="text-gray-600 mt-4" ><FaShippingFast className="inline text-xl mr-5" />Free Shipping Across India</h2>
            <h2 className="text-gray-600 " ><FaRegStar className="inline text-xl mr-5" />100% Authentic</h2>
            <h2 className="text-gray-600 " ><FaRegHeart className="inline text-xl mr-5" />Free in-house repairs & adjustments</h2>
            <h2 className="text-gray-600 " ><IoIosReturnLeft className="inline text-xl mr-5" />7-days easy exchange</h2>

          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default page;
