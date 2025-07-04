"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProduct, setSelectedColor, setMainImage } from "@/store/productSlice";
import Image from "next/image";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const ProductImages = ({ product }) => {
  const dispatch = useDispatch();
  const { selectedColor, mainImage, images } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(setProduct(product));
  }, [dispatch, product]);

  return (
    <div className="flex w-full flex-row-reverse md:flex-row items-start md:items-start gap-6">

      <div className="flex w-fit flex-col gap-3">
        {images[selectedColor]?.map((img, index) => (
          <div
            key={index}
            className="w-12 h-12 md:w-20 md:h-20 flex items-center justify-center bg-gray-100 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-[#0071E3] transition-all"
            onClick={() => dispatch(setMainImage(img))}
          >
            <Image
              width={80}
              height={80}
              src={`${baseApi}${img}`}
              alt={`Thumbnail ${index}`}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ))}
      </div>

      <div className="w-full h-fit">
        <Image
          width={600}
          height={600}
          src={`${baseApi}${mainImage}`}
          alt={product.name}
          className="w-full h-fit object-cover rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default ProductImages;
