

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AddCartButton from "@/components/AddCartButton";
import products from "./products";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HomeCaroucel from "@/components/HomeCaroucel";
import HomeCategories from "@/components/HomeCategories";


const banners = ["1.png", "2.png", "3.png", "4.png"]


export default function Home() {
  const categories = [
    { id: "12", name: "Rayban" },
    { id: "13", name: "Vogue" },
    { id: "14", name: "Oakley" },
    { id: "15", name: "Prada" },
    { id: "16", name: "Versace" },
    { id: "17", name: "Gucci" },
    { id: "18", name: "Carrera" },
    { id: "19", name: "Burberry" },
  ];





  return (

    <>
      <div className="z-40">
        <TopBar />
      </div>
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
      </div>


      <section>
        <HomeCaroucel />
      </section>


      {/* <section className="p-4 md:px-32 md:py-10">
        <div className="w-full flex flex-col items-center justify-center ">
          <Tabs
            defaultValue="12"
            className="w-full  flex flex-col items-center justify-center"
          >
            <TabsList className="text-2xl h-fit bg-white my-6">
              {categories.map((category) => (
                <TabsTrigger
                  className="text-xl p-4 "
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent className="w-full" key={category.id} value={category.id}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {products[category.id]?.map((product) => (
                    <Link
                      href={`/product/${product.id}`}
                      key={product.id}
                      className="border flex flex-col bg-gray-50 h-full hover:scale-105 transition-all duration-300"
                    >
                      <div className="relative h-[250px]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          layout="fill"
                          objectFit="cover"
                          className=" rounded-t-md w-full h-fit"
                        />
                      </div>
                      <div className="flex flex-col p-2">
                        <h3 className="text-sm font-[600] text-gray-600 uppercase">
                          {product.name}
                        </h3>
                        <p className="font-[200] w-full text-gray-500">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex flex-row w-full justify-between mt-auto  pt-8 p-2">
                        <p className="text-3xl py-2 font-[700] mt-auto">₹{product.price}</p>
                        <AddCartButton product={product} />
                      </div>
                    </Link>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>


        </div>

      </section > */}

      <section>
        <HomeCategories />
      </section>


    </>
  );
}
