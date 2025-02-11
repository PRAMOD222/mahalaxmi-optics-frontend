import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Home() {


  return (

    <>
    <Navbar />
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 ">
      <div className="text-center ">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Build Your Dream Website
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Create professional static websites with ease. Sign up, pick components, and customize to your style.
        </p>
        <Link href='/signup' className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300" >Get Started</Link>
      </div>
    </main>
    <Footer />
    </>
  );
}
