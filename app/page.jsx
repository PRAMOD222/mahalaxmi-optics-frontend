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
import Styles from '@/css/home.module.css'
import LogosScroller from "@/components/HomeLogoScroller";
import Footer from "@/components/Footer";


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


      <section>
        <HomeCategories />
      </section>

      <section className={`${Styles.homebg}`}>
        <div className="mx-6 md:mx-32 py-8">
          <h2 className="text-xl md:text-4xl mb-8 text-white font-semibold">CHANGING THE WAY PEOPLE BUY GLASSES</h2>
          <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-6 ">
            <div className="flex flex-col items-center text-white md:p-6 gap-2 md:gap-4 ">
              <Image className="w-2/3 md:w-1/2 " width={400} height={400} alt="icons" src={'/delivery-man.svg'} />
              <h2 className="text-xs md:text-xl font-semibold text-center">Pan India <br /> Delivery</h2>
            </div>
            <div className="flex flex-col items-center text-white md:p-6 gap-2 md:gap-4 ">
              <Image className="w-2/3 md:w-1/2 " width={400} height={400} alt="icons" src={'/original.svg'} />
              <h2 className="text-xs md:text-xl font-semibold text-center">100% <br /> Authentic</h2>
            </div>
            <div className="flex flex-col items-center text-white md:p-6 gap-2 md:gap-4 ">
              <Image className="w-2/3 md:w-1/2 " width={400} height={400} alt="icons" src={'/rating.svg'} />
              <h2 className="text-xs md:text-xl font-semibold text-center">After <br /> Sales Service</h2>
            </div>
            <div className="flex flex-col items-center text-white md:p-6 gap-2 md:gap-4 ">
              <Image className="w-2/3 md:w-1/2 " width={400} height={400} alt="icons" src={'/payment.svg'} />
              <h2 className="text-xs md:text-xl font-semibold text-center">After <br /> Sales Service</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-6 md:mx-32 mt-10">
        <div className="text-center">
          <h2 className="font-semibold">SUNGLASSES | OPTICALS</h2>
          <h2 className=" text-2xl md:text-4xl font-semibold text-[#763f98]">State-of-Art Optical Solutions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 mt-10">
          <div className=" aspect-square relative">
            <Image src={'/his.png'} width={500} height={500} alt="His collection" className="w-3/4 h-3/4" />
            <div className="absolute  aspect-square w-1/2 bottom-0 right-0 flex flex-col gap-4 ">
              <h2 className="text-white bg-[#763f98] h-1/4 flex justify-center items-center md:text-xl font-semibold">HIS COLLECTION</h2>
              <div className="flex flex-col justify-center p-6 bg-[#763f98] flex-1 gap-2">
                <h2 className="text-white md:text-lg ">Handsomeness Comes From A Stylish Face</h2>
                <Link className="block border-2 md:border-4 px-2 py-1 text-white font-semibold w-max" href={'/'} >View Collection</Link>
              </div>
            </div>
          </div>
          <div className=" aspect-square relative">
            <Image src={'/her.png'} width={500} height={500} alt="Her collection" className="w-3/4 h-3/4" />
            <div className="absolute  aspect-square w-1/2 bottom-0 right-0 flex flex-col gap-4 ">
              <h2 className="text-white bg-[#763f98] h-1/4 flex justify-center items-center md:text-xl font-semibold">HER COLLECTION</h2>
              <div className="flex flex-col justify-center p-6 bg-[#763f98] flex-1 gap-2">
                <h2 className="text-white md:text-lg ">Beautify Your Day By Beautiful Glasses</h2>
                <Link className="block border-2 md:border-4 px-2 py-1 text-white font-semibold w-max" href={'/'} >View Collection</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-6 md:mx-32 my-10">

        <div className="text-center">
          <h2 className="font-semibold">POPULAR BRANDS</h2>
          <h2 className=" text-2xl md:text-4xl font-semibold text-[#763f98]">The Perfect Pair, A Click Away</h2>
        </div>

        <div>
          <LogosScroller />
        </div>
        

      </section>

      <Footer />

      


    </>
  );
}
