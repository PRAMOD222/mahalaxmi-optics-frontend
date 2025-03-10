"use client";
import { setSelectedColor } from "@/store/productSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductColors = ({ product }) => {
  const dispatch = useDispatch();
  const { selectedColor } = useSelector((state) => state.product);
  return (
    <div className="flex flex-col ">
      <p className=" text-gray-600 font-[500]">Color - {selectedColor}</p>
      <div className="flex gap-1 mt-2">
        {product.colors.map((color) => (
          <div key={color._id}>
            <div
              className={`w-fit rounded-md border-2 ] ${
                selectedColor === color.color_name ? "border-[#0071E3]" : " border-transparent"
              }`}
              style={{
                
              }}
            >
              <div
                className="w-8 h-8 m-1 inset-deep rounded-sm cursor-pointer"
                style={{ backgroundColor: color.color_code }}
                onClick={() => dispatch(setSelectedColor(color.color_name))}
              />
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductColors;