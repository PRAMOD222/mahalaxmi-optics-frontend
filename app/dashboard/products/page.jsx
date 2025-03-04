"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

const baseApi = process.env.NEXT_PUBLIC_BASE_API;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const token = localStorage.getItem("token");
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${baseApi}/api/products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${baseApi}/api/products/${deleteProductId}`,
        {
          method: "DELETE",
          headers: {
            // "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== deleteProductId)
        );
      } else {
        console.error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <Button asChild className="bg-blue-500 text-white">
        <Link href="./products/add-product">Add Product</Link>
      </Button>

      <div className="grid grid-cols-4 gap-6 mt-4">
        {products.map((product) => {
          const firstColor = product.colors?.[0]?.color_name;
          const firstImage = firstColor && product.images?.[firstColor]?.[0];

          return (
            <div key={product._id} className="border rounded-sm p-1 shadow-md">
              {firstImage && (
                <Image
                  className="w-full h-40 object-cover rounded-xs"
                  src={`${baseApi}/api${firstImage}`}
                  alt={product.name}
                  width={200}
                  height={200}
                />
              )}
              <div className="p-2">

              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-700">Price: Rs{product.price}</p>
              <p className="text-gray-700">Stock: {product.quantity}</p>
              <div className="flex gap-2 mt-4">
                <Button asChild className="bg-yellow-500 text-white"><Link href={`./products/${product._id}`}>Edit</Link></Button>
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      className="bg-red-500 text-white"
                      onClick={() => {
                        setDeleteProductId(product._id);
                        setIsDialogOpen(true);
                      }}
                    >
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  {isDialogOpen && (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        Are you sure you want to delete this product?
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <Button onClick={() => setIsDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button
                          className="bg-red-500 text-white"
                          onClick={handleDelete}
                        >
                          Confirm
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
              </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
