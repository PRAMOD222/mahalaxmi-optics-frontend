

import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { FiShoppingCart } from "react-icons/fi";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import AddCartButton from "@/components/AddCartButton";
import products from "./products";


const banners = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]


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


      <section>
        <Carousel className="relative">
          <CarouselContent>
            {banners.map((banner, index) => (
              <CarouselItem key={index}>
                <Image height={1000} width={1000}
                  src={`/${banner}`}
                  alt="Banner"
                  className="w-full lg:h-[80vh] h-[20vh] object-cover"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 left-4 -translate-y-1/2" />
          <CarouselNext className="absolute top-1/2 right-4  -translate-y-1/2" />
        </Carousel>

      </section>


      {/* <section className="p-4 md:px-32 md:py-10  bg-gray-200">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="category  relative">
            <Image src="/man.jpg" alt="Category" width={200} height={200} className="w-full" />
            <Link href="/" className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white backdrop-blur-sm px-2 py-1 rounded-md hover:scale-105 transition-all duration-200 " >Man</Link>
          </div>

          <div className="category  relative">
            <Image src="/girl.jpg" alt="Category" width={200} height={200} className="w-full" />
            <Link href="/" className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white backdrop-blur-sm px-2 py-1 rounded-md hover:scale-105 transition-all duration-200 " >Woman</Link>
          </div>

          <div className="category  relative">
            <Image src="/children.jpg" alt="Category" width={200} height={200} className="w-full" />
            <Link href="/" className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white backdrop-blur-sm px-2 py-1 rounded-md hover:scale-105 transition-all duration-200 " >Children</Link>
          </div>

          <div className="category  relative">
            <Image src="/lense.jpg" alt="Category" width={200} height={200} className="w-full" />
            <Link href="/" className="absolute top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold text-white backdrop-blur-sm px-2 py-1 rounded-md hover:scale-105 transition-all duration-200 " >Lenses</Link>
          </div>

        </div>
      </section> */}

      <section className="p-4 md:px-32 md:py-10">
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

      </section >


    </>
  );
}
