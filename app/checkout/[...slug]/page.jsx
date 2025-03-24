"use client";
import Link from "next/link";
import products from "@/app/products";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const CheckoutPage = () => {
  const productId = useParams().slug;
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchSingleProduct = async () => {
    const response = await fetch(`${baseApi}/products/${productId}`);
    setSelectedProduct(await response.json());
  };

  useEffect(() => {
    fetchSingleProduct();
  }, []);

  if (!selectedProduct) {
    return (
      <div className="mx-4 md:mx-32">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-500">
          The product you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-4 bg-gray-200 text-black px-4 py-2 hover:bg-gray-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <>
                  <div className="sticky top-0 z-50 bg-white">
                    <Navbar />
                  </div>

      <div className="mx-4 md:mx-32">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        <div className="flex flex-col">
          {/* Mobile View */}
          <div className="md:hidden">
            <div className="border-b py-4">
              <div className="flex items-center">
                {selectedProduct.images[selectedProduct.colors[0].color_name] && (
                  <Image
                    height={100}
                    width={100}
                    src={`${baseApi}${
                      selectedProduct.images[selectedProduct.colors[0].color_name][0]
                    }`}
                    alt={selectedProduct.name}
                    className="w-16 h-16 object-cover mr-4"
                  />
                )}
                <div className="flex-1">
                  <span className="font-medium text-lg">
                    {selectedProduct.name}
                  </span>
                  <p className="text-gray-600">₹{selectedProduct.price}</p>
                  <p className="text-gray-600">Quantity: 1</p>
                  <p className="font-[500] mt-2">
                    Total: ₹{selectedProduct.price.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop View */}
          <table className="hidden md:table min-w-full table-auto border-collapse">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="py-2 px-4 text-left">Item</th>
                <th className="py-2 px-4 text-left">Price</th>
                <th className="py-2 px-4 text-left">Quantity</th>
                <th className="py-2 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-4 flex items-center">
                  {selectedProduct.images[selectedProduct.colors[0].color_name] && (
                    <Image
                      height={1000}
                      width={1000}
                      src={`${baseApi}${
                        selectedProduct.images[selectedProduct.colors[0].color_name][0]
                      }`}
                      alt={selectedProduct.name}
                      className="w-16 h-16 object-cover mr-4"
                    />
                  )}
                  <span className="font-medium text-lg">
                    {selectedProduct.name}
                  </span>
                </td>
                <td className="py-2 px-4">₹{selectedProduct.price}</td>
                <td className="py-2 px-4">1</td>
                <td className="py-2 px-4 text-right">
                  ₹{selectedProduct.price.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>

          {/* Grand Total and Buttons */}
          <div className="mt-6 w-full flex flex-col md:w-[40%] ml-auto">
            <h2 className="flex justify-between text-xl font-semibold">
              Grand Total:{" "}
              <span className="text-green-600">
                ₹{selectedProduct.price.toFixed(2)}
              </span>
            </h2>
            <form method="POST" className="flex flex-col gap-4">
              <input
                type="hidden"
                name="productId"
                value={selectedProduct.id}
              />
              <input type="hidden" name="quantity" value="1" />
              <button
                type="submit"
                className="flex items-center justify-center mt-4 bg-black text-white px-4 py-2 hover:bg-gray-800"
              >
                Place Order
              </button>
            </form>
            <Link
              href="/"
              className="flex items-center justify-center mt-4 bg-gray-200 text-black px-4 py-2 hover:bg-gray-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;