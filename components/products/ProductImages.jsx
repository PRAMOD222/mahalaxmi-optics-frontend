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
    <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
      <div className="flex md:flex-col gap-2">
        {images[selectedColor]?.map((img, index) => (
          <Image
            key={index}
            width={100}
            height={100}
            src={`${baseApi}${img}`}
            alt={`Thumbnail ${index}`}
            className="w-20 h-20 object-cover border-2 border-gray-300 cursor-pointer"
            onClick={() => dispatch(setMainImage(img))}
          />
        ))}
      </div>

      <div className="w-[400px] h-[400px]">
        <Image
          width={400}
          height={400}
          src={`${baseApi}${mainImage}`}
          alt={product.name}
          className="w-full h-full object-cover border"
        />
      </div>


    </div>
  );
};

export default ProductImages;
