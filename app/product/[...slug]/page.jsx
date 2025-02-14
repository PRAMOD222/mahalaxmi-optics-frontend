import products from "@/app/products";
import ProductButtons from "@/components/products/ProductButtons";
import Image from "next/image";

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
            <p className="text-4xl font-semibold mb-4">₹{product.price}</p>
            <p className="font-[500] text-gray-600 mb-4">
              {product.description}
            </p>


            <ProductButtons product={product} />
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  );
};

export default page;
